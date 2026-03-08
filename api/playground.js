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
        const { messages } = req.body;

        if (!process.env.NVIDIA_API_KEY) {
            return res.status(500).json({
                error: 'Server is missing NVIDIA API credentials.'
            });
        }

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

        const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.NVIDIA_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "meta/llama-3.3-70b-instruct",
                messages: apiMessages,
                temperature: 0.7,
                max_tokens: 600,
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
        console.error("Playground API error:", error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
}
