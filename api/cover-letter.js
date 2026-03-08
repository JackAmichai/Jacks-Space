export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { companyName } = req.body;

        if (!companyName || companyName.trim().length < 2) {
            return res.status(400).json({ error: 'Please provide a valid company name.' });
        }

        if (!process.env.NVIDIA_API_KEY) {
            return res.status(500).json({
                error: 'Server is missing NVIDIA API credentials.'
            });
        }

        const systemPrompt = {
            role: "system",
            content: `You are an AI assistant that generates personalized cover letter pitches for Jack (Yaron) Amichai.

Jack's complete background:
- AI Solutions Engineer with a dual degree in Psychology & Computer Science (Open University of Israel)
- Currently: Junior Consultant at Deloitte Israel — SAP BTP integrations, Python/FastAPI microservices, cloud architecture
- Also: Freelance Data Engineer for Adi Ohayon Revenue Management — scraping tools, pricing algorithms, dashboards
- Past: Research Software Engineer & Team Lead at the Technion (2021-2023) — Python backend, cognitive simulations, VR maze development, cross-functional team management
- Past: Software Engineer at Hebrew University (2020-2021) — C++ & Python for astrophysics simulations
- Military: Staff Sergeant in the IDF — team operations, leadership under pressure
- Key Projects: Hatrick (multi-agent cyber defense using LangChain/Groq), LeAIrn (AI education platform), Scholar 2.6 (Chrome extension), PawQuest (social dog app), SleepCall (audio alert tool)
- Certifications: SAP Certified Solution Architect (BTP), AWS Cloud Practitioner, NVIDIA Compute, AI Orchestration
- Skills: Python, FastAPI, LangChain, Multi-Agent Systems, RAG Pipelines, SAP BTP, AWS, Docker, React, TypeScript
- Languages: Hebrew (native), English (fluent), French (conversational)
- Passionate about ethical AI and bridging human psychology with technical systems
- Contact: jackamichai@gmail.com | Tel Aviv, Israel | Open to relocation

Your task: Write a compelling, personalized 200-250 word pitch for why Jack is perfect for the given company. 
- Reference what you know about the company and connect it to Jack's specific experience
- Be specific — don't be generic. Mention exact projects, skills, and achievements that match
- Tone: confident, professional, but warm and genuine
- Format: Use markdown with bold for key terms
- End with a clear call to action`
        };

        const userMessage = {
            role: "user",
            content: `Generate a personalized pitch for Jack applying to: ${companyName.trim()}`
        };

        const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.NVIDIA_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "meta/llama-3.3-70b-instruct",
                messages: [systemPrompt, userMessage],
                temperature: 0.7,
                max_tokens: 800,
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error("NVIDIA API Error:", errorData);
            return res.status(response.status).json({ error: 'Failed to communicate with AI provider.' });
        }

        const data = await response.json();
        return res.status(200).json(data);

    } catch (error) {
        console.error("Cover Letter API error:", error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
}
