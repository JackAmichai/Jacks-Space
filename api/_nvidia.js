// ========================================
// Shared NVIDIA API utility with:
// - Rate limiting (per-IP, visible to user)
// - Retry with exponential backoff
// - Fallback model support
// ========================================

const PRIMARY_MODEL = "meta/llama-3.3-70b-instruct";
const FALLBACK_MODEL = "meta/llama-3.1-70b-instruct";
const NVIDIA_API_URL = "https://integrate.api.nvidia.com/v1/chat/completions";

// ---- Rate Limiter (in-memory, per serverless instance) ----
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10;      // 10 requests per minute per IP

function getClientIP(req) {
    return req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
        req.headers['x-real-ip'] ||
        req.socket?.remoteAddress ||
        'unknown';
}

function checkRateLimit(ip) {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);

    if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
        rateLimitMap.set(ip, { windowStart: now, count: 1 });
        return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1, resetIn: RATE_LIMIT_WINDOW_MS };
    }

    entry.count++;
    const remaining = Math.max(0, RATE_LIMIT_MAX_REQUESTS - entry.count);
    const resetIn = RATE_LIMIT_WINDOW_MS - (now - entry.windowStart);

    if (entry.count > RATE_LIMIT_MAX_REQUESTS) {
        return { allowed: false, remaining: 0, resetIn };
    }

    return { allowed: true, remaining, resetIn };
}

// Clean up stale entries every 5 minutes
setInterval(() => {
    const now = Date.now();
    for (const [ip, entry] of rateLimitMap) {
        if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS * 2) {
            rateLimitMap.delete(ip);
        }
    }
}, 5 * 60 * 1000);

// ---- Retry with exponential backoff ----
async function fetchWithRetry(url, options, maxRetries = 2) {
    let lastError;
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(url, options);
            if (response.ok) return response;

            // If 429 (too many requests from NVIDIA), wait and retry
            if (response.status === 429 && attempt < maxRetries) {
                const waitMs = Math.pow(2, attempt) * 1000; // 1s, 2s
                await new Promise(r => setTimeout(r, waitMs));
                continue;
            }

            // For other errors, don't retry
            return response;
        } catch (err) {
            lastError = err;
            if (attempt < maxRetries) {
                const waitMs = Math.pow(2, attempt) * 500; // 500ms, 1s
                await new Promise(r => setTimeout(r, waitMs));
            }
        }
    }
    throw lastError;
}

// ---- Main API call with fallback ----
export async function callNvidiaAPI(messages, { temperature = 0.7, max_tokens = 512, stream = false } = {}) {
    const apiKey = process.env.NVIDIA_API_KEY;
    if (!apiKey) {
        throw new Error('NVIDIA_API_KEY not configured');
    }

    const headers = {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
    };

    const makeBody = (model) => JSON.stringify({
        model,
        messages,
        temperature,
        max_tokens,
        ...(stream && { stream: true }),
    });

    // Try primary model
    let response = await fetchWithRetry(NVIDIA_API_URL, {
        method: "POST",
        headers,
        body: makeBody(PRIMARY_MODEL),
    });

    // If primary fails with 404, try fallback model
    if (response.status === 404) {
        console.warn(`Primary model ${PRIMARY_MODEL} returned 404, trying fallback ${FALLBACK_MODEL}`);
        response = await fetchWithRetry(NVIDIA_API_URL, {
            method: "POST",
            headers,
            body: makeBody(FALLBACK_MODEL),
        });
    }

    return response;
}

// ---- CORS + Rate Limit middleware ----
export function handleCorsAndRateLimit(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return { proceed: false };
    }

    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return { proceed: false };
    }

    // Rate limiting
    const ip = getClientIP(req);
    const rateCheck = checkRateLimit(ip);

    // Set rate limit headers (visible to frontend)
    res.setHeader('X-RateLimit-Limit', RATE_LIMIT_MAX_REQUESTS);
    res.setHeader('X-RateLimit-Remaining', rateCheck.remaining);
    res.setHeader('X-RateLimit-Reset', Math.ceil(rateCheck.resetIn / 1000));

    if (!rateCheck.allowed) {
        const retryAfter = Math.ceil(rateCheck.resetIn / 1000);
        res.setHeader('Retry-After', retryAfter);
        res.status(429).json({
            error: `Too many requests. Please wait ${retryAfter} seconds before trying again.`,
            retryAfter,
            rateLimited: true
        });
        return { proceed: false };
    }

    return { proceed: true };
}
