import { callNvidiaAPI, handleCorsAndRateLimit } from './_nvidia.js';

export default async function handler(req, res) {
    const { proceed } = handleCorsAndRateLimit(req, res);
    if (!proceed) return;

    try {
        const { messages } = req.body;

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

        const response = await callNvidiaAPI(apiMessages, {
            temperature: 0.5,
            max_tokens: 512,
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
        if (error.message === 'NVIDIA_API_KEY not configured') {
            return res.status(500).json({ error: 'Server is missing NVIDIA API credentials.' });
        }
        return res.status(500).json({ error: 'Internal server error while processing chat.' });
    }
}
