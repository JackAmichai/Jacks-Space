// Analytics Tracking - Vercel Serverless Function
// Tracks page views, referrers, and user behavior - stores in Airtable

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_ANALYTICS_TABLE = 'Analytics';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { page, event } = req.body;
    const userAgent = req.headers['user-agent'] || 'Unknown';
    const referrer = req.headers['referer'] || 'Direct';
    const timestamp = new Date().toISOString();

    // Prepare analytics data
    const analyticsData = {
      Timestamp: timestamp,
      Page: page || 'unknown',
      Event: event || 'pageview',
      UserAgent: userAgent.substring(0, 200),
      Referrer: referrer,
      IP: req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown'
    };

    // Store in Airtable
    if (AIRTABLE_API_KEY && AIRTABLE_BASE_ID) {
      try {
        const airtableResponse = await fetch(
          `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_ANALYTICS_TABLE)}`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              records: [
                {
                  fields: analyticsData
                }
              ]
            })
          }
        );

        if (!airtableResponse.ok) {
          console.error('Airtable analytics error:', await airtableResponse.text());
        }
      } catch (airtableError) {
        console.error('Airtable analytics failed:', airtableError);
      }
    }

    // Also log to console (backup)
    console.log('Analytics Event:', JSON.stringify(analyticsData));

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Analytics error:', error);
    return res.status(500).json({ error: 'Failed to track event' });
  }
}
