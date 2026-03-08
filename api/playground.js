import { callNvidiaAPI, handleCorsAndRateLimit } from './_nvidia.js';

export default async function handler(req, res) {
    const { proceed } = handleCorsAndRateLimit(req, res);
    if (!proceed) return;

    try {
        const { messages } = req.body;

        const systemPrompt = {
            role: "system",
            content: `You are an AI demonstration running on Jack Amichai's portfolio website. You are powered by NVIDIA Nemotron.

Your purpose is to showcase what AI can do in an engaging, educational, and impressive way. You serve as living proof that Jack can build and deploy real AI applications.

About Jack (use this context when relevant):
- AI Solutions Engineer specializing in Cloud Architecture (GCP, AWS, SAP BTP), Multi-Agent Systems, and enterprise integrations
- Psychology & Computer Science background — designs cognitively adaptive systems
- Built: Hatrick (multi-agent cyber defense), LeAIrn (AI education), Scholar 2.6 (research tools), PawQuest (social app)
- Currently at Deloitte doing SAP BTP & AI integrations
- Certifications: SAP BTP Architect, AWS, NVIDIA
- Contact: jackamichai@gmail.com | linkedin.com/in/jackamichai

Behavior guidelines:
- Be creative, articulate, and impressive
- When asked about AI concepts (RAG, agents, system design), give expert-level but accessible explanations
- When asked "why hire Jack" or similar, give compelling, specific reasons based on his background
- Use markdown formatting: **bold**, bullet points, and clear structure
- Keep responses concise but substantive (150-300 words)
- Show personality — be enthusiastic about AI and technology
- If asked something completely unrelated, redirect gracefully to Jack's expertise areas`
        };

        const apiMessages = [systemPrompt, ...messages];

        const response = await callNvidiaAPI(apiMessages, {
            temperature: 0.7,
            max_tokens: 600,
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error("NVIDIA API Error:", errorData);
            return res.status(response.status).json({ error: 'Failed to communicate with AI provider.' });
        }

        const data = await response.json();
        return res.status(200).json(data);

    } catch (error) {
        console.error("Playground API error:", error);
        if (error.message === 'NVIDIA_API_KEY not configured') {
            return res.status(500).json({ error: 'Server is missing NVIDIA API credentials.' });
        }
        return res.status(500).json({ error: 'Internal server error.' });
    }
}
