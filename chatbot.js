// ========================================
// CLOUD CHATBOT - Jack's Personal Assistant
// ========================================

const jackKnowledgeBase = {
    // Greetings & Small Talk
    "hello|hi|hey|greetings|morning|afternoon|evening": {
        answer: "Hello! 👋 I'm Cloud, Jack's AI assistant. How can I help you today? You can ask me about Jack's experience, projects, or how to contact him.",
        keywords: ["hello", "hi", "greetings"]
    },
    "thanks|thank you|thx|appreciate": {
        answer: "You're welcome! 😊 Let me know if you have any other questions about Jack's work.",
        keywords: ["thanks", "thank you"]
    },
    "who are you|what are you|bot|ai": {
        answer: "I'm Cloud ☁️, a custom-built AI assistant designed to help you navigate Jack's portfolio. I can answer questions about his background, skills, and projects!",
        keywords: ["who are you", "bot", "AI"]
    },

    // Career & Experience
    "army|military|idf|service|givati": {
        answer: "Jack served in the **Israel Defense Forces (IDF)** as a **Staff Sergeant**. He led team operations, managed logistics, and trained personnel. This leadership experience taught him how to handle high-pressure environments and manage complex operational missions—skills he now applies to architecting resilient AI systems.",
        keywords: ["IDF", "military", "leadership", "Staff Sergeant"]
    },
    "hospitality|consultant|consulting|current|work|job|adi|ohayon|deloitte": {
        answer: "Jack currently wears two hats: \n\n1. **Junior Consultant at Deloitte:** Specializing in **SAP BTP & Integrations**, designing microservices and event-driven architectures for enterprise clients.\n\n2. **Freelance Data Engineer:** Building revenue optimization tools and scrapers for **Adi Ohayon Revenue Management**.\n\nHe bridges the gap between enterprise reliability and agile innovation.",
        keywords: ["Deloitte", "Adi Ohayon", "hospitality", "consulting", "Business Analyst", "current role", "SAP BTP"]
    },
    "education|university|degree|studied|psychology|computer science": {
        answer: "Jack holds a **Bachelor's degree in Psychology and Computer Science** from the **Open University of Israel**.\n\nHe also has 3 years of research engineering experience at the **Technion** and **Hebrew University**, where he built software for cognitive simulations and astrophysical data analysis. This dual background allows him to build AI systems that are technically robust and cognitively adaptive.",
        keywords: ["education", "psychology", "computer science", "Technion", "research"]
    },
    "projects|portfolio|built|work|examples": {
        answer: "Jack has built a diverse portfolio of AI solutions. You can ask me about:\n\n🤖 **Sentinel OS** - AI Robotics for healthcare\n🛡️ **Hatrick** - Multi-Agent Cyber Defense\n📚 **NVIDIA Doc Navigator** - RAG Agent\n\nCheck out the Projects section for live demos and code!",
        keywords: ["projects", "portfolio"]
    },
    "skills|technologies|tech stack|programming|languages": {
        answer: "Jack's toolbox leverages his Psychology + CS background:\n\n**AI/GenAI:** Multi-Agent Systems, RAG Pipelines, LangChain, NVIDIA Stack (Isaac Sim)\n**Backend:** Python, FastAPI, SAP BTP, AWS (Solutions Architect Track)\n**Data:** Pandas, SQL, Scikit-learn, Vector DBs\n\nHe specializes in **Systems Architecture**—building the bridge between business goals and technical implementation.",
        keywords: ["skills", "Python", "AI", "SAP", "tech stack"]
    },
    "contact|email|reach|linkedin|phone|schedule|call": {
        answer: "You can reach Jack through:\n\n📧 **Email:** jackamichai@gmail.com\n💼 **LinkedIn:** linkedin.com/in/jackamichai\n📅 **Schedule a Call:** calendly.com/jackamichai\n🐙 **GitHub:** github.com/JackAmichai\n\nHe's actively seeking **AI Solutions Engineer** and **Product Management** roles!",
        keywords: ["contact", "email", "LinkedIn", "schedule"]
    },
    "resume|cv|download|hire|looking": {
        answer: "Jack is actively seeking **AI Solutions Engineer or Product roles**! You can download his CV here:\n\n📄 **Resume** - Complete technical and product history\n\nHe's looking for roles where he can leverage his expertise in **Multi-Agent Systems**, **SAP BTP**, and **Product Architecture**.",
        keywords: ["resume", "hire", "looking for work", "download"]
    },
    "achievements|impact|results|metrics|numbers": {
        answer: "Jack's measurable impact includes:\n\n📈 **Improved revenue forecast accuracy** (hospitality consulting)\n💰 **Measurable revenue impact** (pricing optimization)\n⏱️ **60% time saved** on pricing analysis\n🎯 **High-accuracy ML models** (stock prediction & forecasting)\n📚 **Research publications** (Technion & Hebrew University)\n⚡ **Faster documentation discovery** (NVIDIA RAG system)\n\nHe focuses on data-driven solutions with measurable business outcomes!",
        keywords: ["achievements", "impact", "metrics", "results"]
    },
    "languages|speak|hebrew|english|french": {
        answer: "Jack is multilingual! 🌍\n\n🇮🇱 **Hebrew** - Native speaker\n🇺🇸 **English** - Fluent (professional proficiency)\n🇫🇷 **French** - Conversational\n\nThis helps him work effectively with international teams and clients across different regions.",
        keywords: ["languages", "Hebrew", "English", "French"]
    },
    "research|neuroscience|technion|university|lab": {
        answer: "Jack has extensive research engineering experience:\n\n**Technion (2021-2023):** Research Software Engineer & Team Lead\n💻 Engineered Python backend tools for cognitive simulations\n👥 Managed cross-functional research teams\n\n**Hebrew University (2020-2021):** Software Engineer (Project Alpha)\n🌌 Integrated C++ and Python for 3D astrophysics simulations\n\nHe knows how to translate complex scientific requirements into working software.",
        keywords: ["research", "neuroscience", "Technion", "Hebrew University", "cognitive"]
    },
    "recommendation|reference|letter|vouch|verify|credentials": {
        answer: "Jack has **verified recommendation letters** from multiple sources:\n\n🎓 **Academic & Research:**\n• **Dr. Ben Engelhard** - Head of Engelhard Lab, Technion\n• Technion Research Supervisor (2021-2023)\n• Sasha - Technion Research Colleague\n\n💼 **Professional:**\n• Yaron - Professional Supervisor\n\nAll recommendation letters are available in the **References** section!",
        keywords: ["recommendation", "reference", "letter", "credentials", "vouch", "engelhard"]
    },
    "hatrick|cyber|security|attack|defense|agent": {
        answer: "Jack built **Hatrick**, an AI Agent orchestration system that autonomously demonstrates cyber attacks and defense mechanisms. It simulates red-team/blue-team scenarios to test and improve security posture using multi-agent coordination and LLMs.",
        keywords: ["Hatrick", "cyber", "security", "AI agents"]
    },
    "leairn|learn|education|study|school|teaching": {
        answer: "Jack created **LeAIrn**, an AI-powered learning platform that dynamically adapts content, pace, and style to the individual student's needs. It features adaptive learning algorithms and AI tutors for a personalized education experience.",
        keywords: ["LeAIrn", "education", "AI tutor", "adaptive learning"]
    },
    "scholar|research|academic|citation|library|paper": {
        answer: "Jack built **Scholar2.6**, a modern academic search and organization tool. It streamlines the research process with intuitive library management and citation tools, helping researchers manage vast amounts of literature efficiently.",
        keywords: ["Scholar2.6", "research", "academic", "citation"]
    },
    "sleepcall|audio|alert|name|recognition|meeting": {
        answer: "Jack developed **SleepCall**, an intelligent audio monitoring tool that alerts you whenever your name is spoken in a call. It uses local speech recognition to ensure privacy while preventing you from missing important mentions during long meetings.",
        keywords: ["SleepCall", "audio", "alert", "speech recognition"]
    },
    "inspiration|career|path|architect|future|vision": {
        answer: "Jack is inspired by the challenge of **Ethical AI**. His vision is to become an **AI Solutions Architect** who builds systems that are powerful, transparent, and aligned with human intent—proving that we don't have to choose between technical efficiency and human values.",
        keywords: ["inspiration", "career path", "product architect", "vision"]
    },
    "pawquest|paw|quest|dog|pet|social|app|community": {
        answer: "Jack built **PawQuest**, a social platform for dog owners! 🐕 It helps pet owners find playmates for their dogs, organize local meetups, and build community. Features include dog profile matching (by breed, size, temperament), location-based discovery, event scheduling with RSVPs, and community forums. Check it out at paw-quest-f31de0c0.base44.app!",
        keywords: ["PawQuest", "dog", "pet", "social app", "community"]
    }
};

// Sample questions to display
const sampleQuestions = [
    "Tell me about Sentinel OS",
    "What is Hatrick?",
    "Tell me about Jack's research",
    "Does Jack know SAP BTP?",
    "What is his tech stack?",
    "How can I contact Jack?",
    "Is Jack looking for work?",
    "Does Jack have recommendations?"
];

class CloudChatbot {
    constructor() {
        this.isOpen = false;
        this.conversationHistory = [];
        this.init();
    }

    init() {
        this.createChatbotUI();
        this.attachEventListeners();
        this.displayWelcomeMessage();
    }

    createChatbotUI() {
        // Chatbot bubble button
        const bubble = document.createElement('div');
        bubble.id = 'chatbot-bubble';
        bubble.className = 'chatbot-bubble';
        bubble.innerHTML = `
            <img src="images/cloud-bot.jpg" alt="Cloud Assistant" class="chatbot-avatar">
            <div class="chatbot-bubble-pulse"></div>
        `;
        document.body.appendChild(bubble);

        // Chatbot popup notification
        const popup = document.createElement('div');
        popup.id = 'chatbot-popup';
        popup.className = 'chatbot-popup';
        popup.innerHTML = `
            <div class="chatbot-popup-header">
                <div class="chatbot-popup-avatar">☁️</div>
                <h4 class="chatbot-popup-title">Hey! I'm Cloud</h4>
                <button class="chatbot-popup-close" id="popup-close">✕</button>
            </div>
            <p class="chatbot-popup-message">
                I'm Jack's AI assistant! I can answer questions about his experience, projects, or how to get in touch. Try me out!
            </p>
            <button class="chatbot-popup-cta" id="popup-cta">Ask Me Anything</button>
        `;
        document.body.appendChild(popup);

        // Show popup after 2 seconds, hide after 10 seconds or when dismissed
        setTimeout(() => {
            popup.style.display = 'block';

            // Auto-hide after 10 seconds
            setTimeout(() => {
                if (!popup.classList.contains('hidden')) {
                    popup.classList.add('hidden');
                    setTimeout(() => popup.style.display = 'none', 300);
                }
            }, 10000);
        }, 2000);

        // Popup close handler
        document.getElementById('popup-close').addEventListener('click', () => {
            popup.classList.add('hidden');
            setTimeout(() => popup.style.display = 'none', 300);
        });

        // Popup CTA handler - open chatbot
        document.getElementById('popup-cta').addEventListener('click', () => {
            popup.classList.add('hidden');
            setTimeout(() => popup.style.display = 'none', 300);
            this.toggleChat();
        });


        // Chatbot window
        const chatWindow = document.createElement('div');
        chatWindow.id = 'chatbot-window';
        chatWindow.className = 'chatbot-window';
        chatWindow.innerHTML = `
            <div class="chatbot-header">
                <div class="chatbot-header-content">
                    <img src="images/cloud-bot.jpg" alt="Cloud" class="chatbot-header-avatar">
                    <div class="chatbot-header-text">
                        <h3>Cloud ☁️</h3>
                        <p>Jack's AI Assistant</p>
                    </div>
                </div>
                <button class="chatbot-close" id="chatbot-close">✕</button>
            </div>
            <div class="chatbot-messages" id="chatbot-messages"></div>
            <div class="chatbot-suggestions" id="chatbot-suggestions"></div>
            <div class="chatbot-input-wrapper">
                <input 
                    type="text" 
                    id="chatbot-input" 
                    placeholder="Ask about projects, skills, or contact info..."
                    autocomplete="off"
                >
                <button id="chatbot-send">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                </button>
            </div>
        `;
        document.body.appendChild(chatWindow);
    }

    attachEventListeners() {
        const bubble = document.getElementById('chatbot-bubble');
        const closeBtn = document.getElementById('chatbot-close');
        const sendBtn = document.getElementById('chatbot-send');
        const input = document.getElementById('chatbot-input');

        bubble.addEventListener('click', () => this.toggleChat());
        closeBtn.addEventListener('click', () => this.toggleChat());
        sendBtn.addEventListener('click', () => this.handleSendMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSendMessage();
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        const chatWindow = document.getElementById('chatbot-window');
        const bubble = document.getElementById('chatbot-bubble');

        if (this.isOpen) {
            chatWindow.classList.add('open');
            bubble.classList.add('hidden');
            document.getElementById('chatbot-input').focus();

            // Track opening
            if (typeof trackCTAClick !== 'undefined') {
                trackCTAClick('chatbot_opened');
            }
        } else {
            chatWindow.classList.remove('open');
            bubble.classList.remove('hidden');
        }
    }

    displayWelcomeMessage() {
        setTimeout(() => {
            this.addMessage(
                "Hi! I'm Cloud ☁️, Jack's AI assistant! I've been updated with his latest work in **AI Solutions Engineering** and **Multi-Agent Systems**. Ask me anything about his projects, skills, or experience!",
                'bot'
            );
            this.displaySuggestions();
        }, 500);
    }

    displaySuggestions() {
        const suggestionsContainer = document.getElementById('chatbot-suggestions');

        // Show 3 random suggestions
        const randomSuggestions = this.getRandomItems(sampleQuestions, 3);

        suggestionsContainer.innerHTML = randomSuggestions.map(question =>
            `<button class="suggestion-btn" data-question="${question}">${question}</button>`
        ).join('');

        // Attach click handlers
        suggestionsContainer.querySelectorAll('.suggestion-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const question = e.target.dataset.question;
                this.handleUserMessage(question);
            });
        });
    }

    getRandomItems(array, count) {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    handleSendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();

        if (message) {
            this.handleUserMessage(message);
            input.value = '';
        }
    }

    handleUserMessage(message) {
        // Add user message to chat
        this.addMessage(message, 'user');

        // Find matching answer
        setTimeout(() => {
            const answer = this.findAnswer(message);
            this.addMessage(answer, 'bot');

            // Show new suggestions after answer
            setTimeout(() => this.displaySuggestions(), 500);
        }, 600);

        // Track question
        if (typeof trackCTAClick !== 'undefined') {
            trackCTAClick('chatbot_question_asked');
        }
    }

    findAnswer(question) {
        const lowerQuestion = question.toLowerCase();
        const tokens = lowerQuestion.split(/[\s,.?!]+/); // Simple tokenization

        // 1. Check Dynamic Project Data first (High Priority)
        if (typeof projectsData !== 'undefined') {
            // Find project where user question contains the ID OR any significant word from title
            const project = projectsData.find(p => {
                const titleWords = p.title.toLowerCase().split(' ').filter(w => w.length > 3);
                return lowerQuestion.includes(p.id.toLowerCase()) ||
                    titleWords.some(word => lowerQuestion.includes(word));
            });

            if (project) {
                return `**${project.title}** is a project where Jack addressed: "${project.problem}".\n\n**Solution:** ${project.solution}\n\n**Tech Stack:** ${project.techStack.join(', ')}.`;
            }
        }

        let bestMatch = null;
        let maxScore = 0;

        // Check each knowledge base entry
        for (const [pattern, data] of Object.entries(jackKnowledgeBase)) {
            const keywords = pattern.split('|');
            let score = 0;

            // Calculate score based on keyword matches
            keywords.forEach(keyword => {
                if (lowerQuestion.includes(keyword)) {
                    score += 2; // Exact phrase match bonus
                }
                tokens.forEach(token => {
                    if (token === keyword) {
                        score += 1; // Word match
                    }
                });
            });

            if (score > maxScore) {
                maxScore = score;
                bestMatch = data;
            }
        }

        // Threshold for a "good" match
        if (maxScore >= 2 && bestMatch) {
            return bestMatch.answer;
        }

        // Default response if no match
        return "That's a great question! I don't have specific information about that, but I recommend:\n\n📧 **Emailing Jack directly:** jackamichai@gmail.com\n💼 **Connecting on LinkedIn:** linkedin.com/in/jackamichai\n📅 **Scheduling a call:** calendly.com/jackamichai\n\nYou can also browse his portfolio sections above to learn more about his experience and projects!";
    }

    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${sender}-message`;

        if (sender === 'bot') {
            messageDiv.innerHTML = `
                <img src="images/cloud-bot.jpg" alt="Cloud" class="message-avatar">
                <div class="message-content">${this.formatMessage(text)}</div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-content">${this.escapeHtml(text)}</div>
            `;
        }

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    formatMessage(text) {
        // Convert markdown-style formatting to HTML
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>')
            .replace(/🎯|💰|🤖|📊|📧|💼|📅|🐙|📄|📚|📈|⏱️|🚀|⚡|🔬|📝|👥|🌍|🇮🇱|🇺🇸|🇫🇷|🔔|🔒|🛡️|🎓/g, '<span class="emoji">$&</span>');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.cloudChatbot = new CloudChatbot();
    console.log('☁️ Cloud Chatbot initialized');
});
