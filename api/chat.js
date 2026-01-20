export const config = {
    runtime: 'edge',
};

const RESUME_CONTEXT = `
# JACK (YARON) YAKOV AMICHAI

**Business Analyst | AI Product Builder | Full Stack Developer**

Herzliya, Israel | +972 54-484-4125 | jackamichai@gmail.com

[LinkedIn](https://linkedin.com/in/jackamichai) | [GitHub](https://github.com/JackAmichai) | [Portfolio](https://new-personal-website-topaz.vercel.app) | [Calendly](https://calendly.com/jackamichai)

---

## PROFESSIONAL SUMMARY

**Business Analyst and AI Product Builder** with a dual background in **Psychology and Computer Science**, bridging the gap between human-centric requirements and complex technical implementation. Experienced in designing data-driven solutions that connect business goals with measurable improvements in revenue and decision quality. Proven track record in **Enterprise AI**, **Cloud Computing**, and **Digital Transformation** (Deloitte), with a portfolio of deployed multi-agent systems and consumer applications.

---

## TECHNICAL & PROFESSIONAL SKILLS

- **AI & ML:** Generative AI (LLMs, RAG), Multi-Agent Systems, LangChain, OpenAI API, Vector DBs (Pinecone), Scikit-learn, Pandas.
- **Languages:** Python, TypeScript, JavaScript, SQL, Java, C++, C.
- **Enterprise Systems:** SAP BTP, SAP SuccessFactors, OData, Power BI, Cloud Computing.
- **Web & Tools:** React, Node.js, FastAPI, Next.js, Git, Jira, Figma, Azure Speech SDK.
- **Core Competencies:** Business Analysis, Revenue Analytics, Agile/Scrum, SDLC Management, Research Design.

---

## PROFESSIONAL EXPERIENCE

### DELOITTE | Tel Aviv, Israel
**Junior Consultant** | *Aug 2025 – Present*

- **Implementing enterprise AI solutions** and data-driven systems, leveraging **SAP BTP** and **Gen AI** to optimize large-scale business processes.
- **Supporting digital transformation projects**, analyzing legacy workflows to recommend and execute automation strategies that improve operational efficiency.
- **Collaborating with cross-functional teams** to align technical deliverables with client business goals, ensuring seamless adoption of new technologies.

### ADI OHAYON HOSPITALITY | Hybrid / Remote
**Business Analyst Intern** | *Apr 2025 – Present*

- **Analyzing demand trends** and competitor pricing strategies across hotel portfolios, building **revenue forecasting models** that directly inform pricing decisions.
- **Developing executive dashboards** (Power BI/Excel) to visualize real-time KPIs, enabling stakeholders to make data-backed strategic adjustments.
- **Collaborating with sales and marketing** to align promotional activities with operational capacity and profitability targets.

### TECHNION - ISRAEL INSTITUTE OF TECHNOLOGY | Haifa, Israel
**Research Assistant & Team Coordinator** | *2021 – 2023*

- **Conducted cognitive psychology research**, managing participant recruitment and lab operations.
- **Analyzed experimental data** using **Python** and **SPSS**, translating complex datasets into actionable research insights.
- **Coordinated cross-functional teams**, ensuring strict adherence to research protocols and timelines.

### HEBREW UNIVERSITY OF JERUSALEM | Jerusalem, Israel
**Research Project Manager & Software Engineer** | *2020 – 2021*

- **Managed research project timelines**, serving as the technical lead for data collection and analysis tools.
- **Developed C++ software solutions** to support experimental workflows, bridging the gap between theoretical research needs and technical execution.

---

## KEY PROJECTS

### Hatrick: AI Cyber Defense | *AI Lead & Developer*
- **Built a multi-agent system** for cyber attack/defense simulation using **LLM orchestration** (LangChain/Groq).
- **Engineered a high-performance architecture** featuring 6+ autonomous AI agents with sub-second inference capabilities.
- **Stack:** React, TypeScript, FastAPI, LangChain, Groq.

### NVIDIA Documentation Navigator | *AI Engineer* | [Code](https://github.com/JackAmichai/Nvidia-doc-agentic-ai)
- **Developed an AI-powered unified search engine** using **RAG (Retrieval-Augmented Generation)** to query NVIDIA documentation.
- **Implemented version-aware answers** and code generation features, utilizing **Pinecone** for vector storage and **FastAPI** for the backend.

### PawQuest: Dog Social App | *Full Stack Developer* | [Live App](https://paw-quest-f31de0c0.base44.app)
- **Launched a social platform** for dog owners featuring real-time matching, location discovery, and event scheduling.
- **Designed a community-focused UX**, enabling users to organize meetups and build local networks.
- **Stack:** React, Node.js, Base44.

### Scholar 2.6: AI Research Navigator | *Frontend Engineer* | [Code](https://github.com/JackAmichai/Scholar2.6)
- **Created a Chrome Extension** with an AI-driven interface for academic research, integrating with **Semantic Scholar** to visualize knowledge graphs.
- **Stack:** TypeScript, React, OpenAI API.

### SleepCall: Meeting Sentinel | *Python Developer* | [Code](https://github.com/JackAmichai/SleepCall)
- **Engineered a real-time audio monitoring tool** using **Azure Speech SDK** to detect specific keywords (e.g., names) and generate AI summaries of missed context.

---

## EDUCATION

### OPEN UNIVERSITY OF ISRAEL
**B.A. in Psychology & Computer Science**
- *Focus:* Dual-major combining algorithmic thinking with human behavioral analysis.

---

## MILITARY SERVICE

### ISRAEL DEFENSE FORCES (IDF)
**Staff Sergeant - Operations & Leadership** | *Mar 2017 – Aug 2018*

- Led team operations and mission planning in high-pressure environments.
- Managed logistics and resource allocation while training junior personnel.

---

## LANGUAGES

- **Hebrew:** Native
- **English:** Fluent
- **Spanish:** Conversational
- **German:** Conversational
`;

// Get API key from environment variable
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || 'meta-llama/llama-3.1-8b-instruct';
const OPENROUTER_SITE_URL = process.env.OPENROUTER_SITE_URL || 'https://new-personal-website-topaz.vercel.app';

function generateFallbackAnswer(message = '', includeNotice = true) {
    const query = message.toLowerCase();
    const notice = includeNotice ? "I'm running in backup mode right now, so here's what I can share from Jack's profile:\n\n" : '';

    const projectResponses = [
        {
            keywords: ['hatrick'],
            answer: 'Hatrick is Jack\'s AI cyber-defense project where he orchestrated six autonomous agents using LangChain and Groq to simulate real-time attack and defense scenarios.'
        },
        {
            keywords: ['leairn'],
            answer: 'LeAIrn is Jack\'s venture into AI-powered education tools, combining engaging UX experiments with GenAI-driven micro-learning content.'
        },
        {
            keywords: ['scholar'],
            answer: 'Scholar 2.6 is a Chrome Extension Jack built to navigate academic research by pulling structured insights and visualizations from Semantic Scholar.'
        },
        {
            keywords: ['sleepcall'],
            answer: 'SleepCall is a Python-based assistant Jack created using Azure Speech SDK to monitor meetings in real time, catch missed cues, and generate AI summaries.'
        }
    ];

    for (const project of projectResponses) {
        if (project.keywords.some(keyword => query.includes(keyword))) {
            return `${notice}${project.answer}`;
        }
    }

    if (query.includes('contact') || query.includes('reach') || query.includes('email')) {
        return `${notice}You can reach Jack at jackamichai@gmail.com, connect on LinkedIn at https://linkedin.com/in/jackamichai, or schedule time via https://calendly.com/jackamichai.`;
    }

    if (query.includes('skill') || query.includes('stack') || query.includes('tech')) {
        return `${notice}Jack works with Python, TypeScript, JavaScript, SQL, Java, and C/C++. He builds full-stack web apps with React, Node.js, and Next.js, and ships AI agents with LangChain, vector DBs, and OpenAI-compatible APIs.`;
    }

    if (query.includes('experience') || query.includes('background') || query.includes('career') || query.includes('deloitte')) {
        return `${notice}Jack is a Junior Consultant at Deloitte in Tel Aviv, helping clients ship enterprise AI products on SAP BTP. He also supports revenue analytics projects and previously led research initiatives at Technion and Hebrew University.`;
    }

    if (query.includes('education') || query.includes('study') || query.includes('university')) {
        return `${notice}Jack earned a dual-major B.A. in Psychology & Computer Science from the Open University of Israel, blending human behavior insights with solid engineering foundations.`;
    }

    return `${notice}Jack Amichai is a business analyst and AI product builder who bridges psychology, data, and technology. He deploys multi-agent systems, enterprise AI solutions, and full-stack applications that improve decision-making and operations.`;
}

// CORS headers for cross-origin requests (e.g., from GitHub Pages)
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

export default async function handler(req) {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (req.method !== 'POST') {
        return new Response('Method not allowed', { status: 405, headers: corsHeaders });
    }

    // Check if API key is configured
    if (!OPENROUTER_API_KEY) {
        console.error("OPENROUTER_API_KEY not configured");
        return new Response(JSON.stringify({ answer: "I'm not fully configured yet. Please ask Jack to set up my brain! 🧠" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
    }

    let userMessage = '';

    try {
        const body = await req.json();
        const message = typeof body?.message === 'string' ? body.message : '';
        const isResumeCustomizer = body?.isResumeCustomizer === true;
        userMessage = message;

        const originHeader = typeof req.headers?.get === 'function' ? (req.headers.get('origin') || req.headers.get('referer')) : null;
        const refererHeader = originHeader || OPENROUTER_SITE_URL;

        // Different system prompts based on mode
        const systemPrompt = isResumeCustomizer 
            ? `You are a professional resume customizer assistant for Jack Amichai. 
            A recruiter or hiring manager is describing a role they're hiring for.
            Your job is to generate a TAILORED PITCH showing why Jack is the perfect candidate.
            
            Here is Jack's full profile:
            ${RESUME_CONTEXT}
            
            Instructions:
            1. Read the role description carefully.
            2. Match Jack's skills, projects, and experience to the role requirements.
            3. Generate a compelling 3-4 paragraph pitch in first person ("I" statements).
            4. Include specific examples from Jack's experience that match the role.
            5. Be enthusiastic but professional.
            6. End with a call to action (schedule a call, review portfolio, etc.)
            7. Use formatting with **bold** for key highlights.
            
            Structure your response as:
            - Opening hook connecting Jack's background to the role
            - 2-3 specific examples of relevant experience/projects
            - Why Jack is uniquely positioned for this role
            - Call to action`
            : `You are Cloud, Jack Amichai's personal AI assistant on his portfolio website. 
            Your goal is to answer visitors' questions about Jack using the provided context.
            
            Here is Jack's Resume/Context:
            ${RESUME_CONTEXT}
            
            Guidelines:
            1. Be friendly, professional, and concise.
            2. Use emojis occasionally to be engaging (e.g., 👋, 🚀, 💻).
            3. ONLY answer based on the provided context. If you don't know the answer, say you don't have that information but they can contact Jack directly.
            4. Highlight key skills and achievements.
            5. If asked about contact info, provide the email and LinkedIn from the context.
            6. Keep answers relatively short (under 3-4 sentences) unless a detailed explanation is requested.
            7. You are representing Jack, so be positive and impressive.`;

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
                "HTTP-Referer": refererHeader,
                "X-Title": "Jack Amichai Portfolio",
            },
            body: JSON.stringify({
                "model": OPENROUTER_MODEL,
                "messages": [
                    {
                        "role": "system",
                        "content": systemPrompt
                    },
                    {
                        "role": "user",
                        "content": message
                    }
                ]
            })
        });

        const responseText = await response.text();
        console.log("OpenRouter Response Status:", response.status);
        console.log("OpenRouter Response:", responseText.substring(0, 500));

        if (!response.ok) {
            console.error("OpenRouter request failed", response.status, responseText);
            const fallback = generateFallbackAnswer(userMessage);
            return new Response(JSON.stringify({ answer: fallback }), {
                status: 200,
                headers: { 'Content-Type': 'application/json', ...corsHeaders }
            });
        }

        let data;
        try {
            data = JSON.parse(responseText);
        } catch (parseError) {
            console.error("Failed to parse response:", parseError);
            const fallback = generateFallbackAnswer(userMessage);
            return new Response(JSON.stringify({ answer: fallback }), {
                status: 200,
                headers: { 'Content-Type': 'application/json', ...corsHeaders }
            });
        }
        
        if (data.error) {
             console.error("OpenRouter Error:", JSON.stringify(data.error));
             const fallback = generateFallbackAnswer(userMessage);
             return new Response(JSON.stringify({ answer: fallback }), {
                status: 200,
                headers: { 'Content-Type': 'application/json', ...corsHeaders }
            });
        }

        // Safely extract the answer with proper checks
        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            console.error("Unexpected response structure:", JSON.stringify(data));
            const fallback = generateFallbackAnswer(userMessage);
            return new Response(JSON.stringify({ answer: fallback }), {
                status: 200,
                headers: { 'Content-Type': 'application/json', ...corsHeaders }
            });
        }

        const answer = data.choices[0].message.content;

        return new Response(JSON.stringify({ answer }), {
            status: 200,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });

    } catch (error) {
        console.error("Server Error:", error.message, error.stack);
        const fallback = generateFallbackAnswer(userMessage, true);
        return new Response(JSON.stringify({ answer: fallback }), {
            status: 200,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
    }
}
