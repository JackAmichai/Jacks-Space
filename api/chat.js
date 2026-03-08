export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
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
        const { messages } = req.body;

        if (!process.env.NVIDIA_API_KEY) {
            console.warn("Missing NVIDIA_API_KEY environment variable");
            return res.status(500).json({
                error: 'Server is missing NVIDIA API credentials. Please set NVIDIA_API_KEY in the Vercel dashboard.'
            });
        }

        // System prompt containing Jack's CV and info
        const systemPrompt = {
            role: "system",
            content: `You are Cloud, Jack's personal AI assistant! You help visitors navigate his portfolio, learn about his skills, and contact him. 
Always be concise, professional, friendly, and helpful. Use emojis occasionally.

Here is the data on Jack (Yaron) Amichai you need to know:
- Education: Bachelor's in Psychology and Computer Science from The Open University of Israel.
- Current Roles: Junior Consultant at Deloitte (SAP BTP & Integrations, Cloud Architecture) and Freelance Data Engineer for Adi Ohayon Revenue Management.
- Past Experience: Research Software Engineer at Technion (Python, Neuroscience algorithms, team management) and Software Engineer at Hebrew University (Project Alpha, C++ astrophysics simulations). He was also a Staff Sergeant in the IDF (Logistics, Leadership).
- Top Skills: Generative AI, Multi-Agent Systems, Solution Architecture (SAP BTP & AWS), Python, RAG pipelines, LLMs (LangChain).
- Projects: 
  * Hatrick: Autonomous cyber-defense multi-agent system.
  * LeAIrn: Adaptive AI education platform.
  * Scholar 2.6: Academic research assistant and citation tool.
  * PawQuest: Tinder for dogs social app.
  * SleepCall: Audio accessibility tool that alerts when your name is called in meetings.
- Certifications: SAP Certified Solution Architect, AWS Cloud Practitioner, NVIDIA AI Orchestration.
- Location: Based in Tel Aviv, Israel, open to relocation.
- Contact info: jackamichai@gmail.com, linkedin.com/in/jackamichai, github.com/JackAmichai, calendly.com/jackamichai.
- Career Goal: Seeking roles as an AI Solutions Engineer or Software Product Manager.

Answer questions based ONLY on this data. If asked something unrelated, redirect politely to his skills/experience.`
        };

        const apiMessages = [systemPrompt, ...messages];

        // Call NVIDIA NIM Nemotron-70B model
        const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.NVIDIA_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "meta/llama-3.3-70b-instruct",
                messages: apiMessages,
                temperature: 0.5,
                max_tokens: 512,
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
        console.error("Chat API error:", error);
        return res.status(500).json({ error: 'Internal server error while processing chat.' });
    }
}
