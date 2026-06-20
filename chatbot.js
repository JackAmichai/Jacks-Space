// ========================================
// CLOUD CHATBOT - Jack's Personal Assistant
// ========================================

const getJackKnowledgeBase = () => {
    const t = (key) => window.translationManager ? window.translationManager.t(key) : key;
    
    return {
        // Greetings & Small Talk
        "hello|hi|hey|greetings|morning|afternoon|evening": {
            answer: t('bot_kb_hello'),
            keywords: ["hello", "hi", "greetings"]
        },
        "thanks|thank you|thx|appreciate": {
            answer: t('bot_kb_thanks'),
            keywords: ["thanks", "thank you"]
        },
        "who are you|what are you|bot|ai": {
            answer: t('bot_kb_who'),
            keywords: ["who are you", "bot", "AI"]
        },

        // Career & Experience
        "army|military|idf|service|givati": {
            answer: t('bot_kb_army'),
            keywords: ["IDF", "military", "leadership", "Staff Sergeant"]
        },
        "hospitality|consultant|consulting|current|work|job|adi|ohayon|deloitte|hy group|h.y|product manager|electronics|import|wd|sandisk|lg": {
            answer: t('bot_kb_work'),
            keywords: ["Deloitte", "Adi Ohayon", "hospitality", "consulting", "Business Analyst", "current role", "SAP BTP", "H.Y Group", "Product Manager", "WD", "SanDisk", "LG"]
        },
        "education|university|degree|studied|psychology|computer science": {
            answer: t('bot_kb_edu'),
            keywords: ["education", "psychology", "computer science", "Technion", "research"]
        },
        "projects|portfolio|built|work|examples": {
            answer: t('bot_kb_projects'),
            keywords: ["projects", "portfolio"]
        },
        "skills|technologies|tech stack|programming|languages": {
            answer: t('bot_kb_skills'),
            keywords: ["skills", "Python", "AI", "SAP", "tech stack"]
        },
        "contact|email|reach|linkedin|phone|schedule|call": {
            answer: t('bot_kb_contact'),
            keywords: ["contact", "email", "LinkedIn", "schedule"]
        },
        "resume|cv|download|hire|looking": {
            answer: t('bot_kb_resume'),
            keywords: ["resume", "hire", "looking for work", "download"]
        },
        "achievements|impact|results|metrics|numbers": {
            answer: t('bot_kb_achievements'),
            keywords: ["achievements", "impact", "metrics", "results"]
        },
        "languages|speak|hebrew|english|french": {
            answer: t('bot_kb_languages'),
            keywords: ["languages", "Hebrew", "English", "French"]
        },
        "passport|citizenship|nationality|british|german|israeli|triple|identity|id card": {
            answer: t('bot_kb_nationality'),
            keywords: ["passport", "citizenship", "nationality", "British", "German", "Israeli", "triple", "ID"]
        },
        "research|neuroscience|technion|university|lab": {
            answer: t('bot_kb_research'),
            keywords: ["research", "neuroscience", "Technion", "Hebrew University", "cognitive"]
        },
        "hatrick|cyber|security|attack|defense|agent": {
            answer: t('bot_kb_hatrick'),
            keywords: ["Hatrick", "cyber", "security", "AI agents"]
        },
        "leairn|learn|education|study|school|teaching": {
            answer: t('bot_kb_leairn'),
            keywords: ["LeAIrn", "education", "AI tutor", "adaptive learning"]
        },
        "scholar|research|academic|citation|library|paper": {
            answer: t('bot_kb_scholar'),
            keywords: ["Scholar2.6", "research", "academic", "citation"]
        },
        "sleepcall|audio|alert|name|recognition|meeting": {
            answer: t('bot_kb_sleepcall'),
            keywords: ["SleepCall", "audio", "alert", "speech recognition"]
        },
        "inspiration|career|path|architect|future|vision": {
            answer: t('bot_kb_vision'),
            keywords: ["inspiration", "career path", "product architect", "vision"]
        },
        "pawquest|paw|quest|dog|pet|social|app|community": {
            answer: t('bot_kb_projects'), // Reusing for now
            keywords: ["PawQuest", "dog", "pet", "social app", "community"]
        }
    };
};

// Sample questions to display
const getSampleQuestions = () => {
    const t = (key) => window.translationManager ? window.translationManager.t(key) : key;
    return [
        t('sample_q1'),
        t('sample_q2'),
        t('sample_q3'),
        t('sample_q4'),
        t('sample_q5'),
        t('sample_q6'),
        t('sample_q7'),
        t('sample_q8')
    ];
};

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
        const t = (key) => window.translationManager ? window.translationManager.t(key) : key;

        // Chatbot bubble button
        const bubble = document.createElement('div');
        bubble.id = 'chatbot-bubble';
        bubble.className = 'chatbot-bubble floating-btn';
        bubble.innerHTML = `
            <img src="images/cloud-bot.jpg" alt="${t('bot_header_title')}" class="chatbot-avatar">
            <div class="chatbot-bubble-pulse"></div>
        `;
        
        const container = document.querySelector('.floating-actions') || document.body;
        container.appendChild(bubble);

        // Chatbot popup notification (leaving it in body)
        const popup = document.createElement('div');
        popup.id = 'chatbot-popup';
        popup.className = 'chatbot-popup';
        popup.innerHTML = `
            <div class="chatbot-popup-header">
                <div class="chatbot-popup-avatar"></div>
                <h4 class="chatbot-popup-title" data-i18n="bot_popup_title">${t('bot_popup_title')}</h4>
                <button class="chatbot-popup-close" id="popup-close">✕</button>
            </div>
            <p class="chatbot-popup-message" data-i18n="bot_popup_message">
                ${t('bot_popup_message')}
            </p>
            <button class="chatbot-popup-cta" id="popup-cta" data-i18n="bot_popup_cta">${t('bot_popup_cta')}</button>
        `;
        document.body.appendChild(popup);

        // Listen for language change to refresh sample questions
        window.addEventListener('languageChanged', () => {
            if (!this.isOpen) {
                this.displaySuggestions();
            }
        });

        // Show popup after 5 seconds, hide after 10 seconds or when dismissed
        setTimeout(() => {
            popup.style.display = 'block';

            // Auto-hide after 10 seconds
            setTimeout(() => {
                if (!popup.classList.contains('hidden')) {
                    popup.classList.add('hidden');
                    setTimeout(() => popup.style.display = 'none', 300);
                }
            }, 10000);
        }, 5000);

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
                        <h3 data-i18n="bot_header_title">${t('bot_header_title')}</h3>
                        <p data-i18n="bot_header_sub">${t('bot_header_sub')}</p>
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
                    placeholder="${t('bot_input_placeholder')}"
                    data-i18n-placeholder="bot_input_placeholder"
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
        const t = (key) => window.translationManager ? window.translationManager.t(key) : key;
        setTimeout(() => {
            this.addMessage(t('bot_welcome'), 'bot');
            this.displaySuggestions();
        }, 500);
    }

    displaySuggestions() {
        const suggestionsContainer = document.getElementById('chatbot-suggestions');

        // Show 3 random suggestions
        const randomSuggestions = this.getRandomItems(getSampleQuestions(), 3);

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

    async handleUserMessage(message) {
        // Add user message to chat
        this.addMessage(message, 'user');

        // Track question
        if (typeof trackCTAClick !== 'undefined') {
            trackCTAClick('chatbot_question_asked');
        }

        // Show thinking indicator
        const messagesContainer = document.getElementById('chatbot-messages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chatbot-message bot-message typing-status';
        typingDiv.innerHTML = `
            <img src="images/cloud-bot.jpg" alt="Cloud" class="message-avatar">
            <div class="message-content">
                <div class="skeleton-loader">
                    <div class="skeleton-line" style="width: 85%"></div>
                    <div class="skeleton-line" style="width: 65%"></div>
                    <div class="skeleton-line" style="width: 75%"></div>
                </div>
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        try {
            // Update Conversation History
            this.conversationHistory.push({ role: "user", content: message });

            // Keep history length manageable (last 8 messages)
            if (this.conversationHistory.length > 8) {
                this.conversationHistory = this.conversationHistory.slice(-8);
            }

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: this.conversationHistory })
            });

            // Check for rate limiting
            const remaining = response.headers.get('X-RateLimit-Remaining');
            const retryAfter = response.headers.get('Retry-After');

            if (response.status === 429) {
                const data = await response.json();
                typingDiv.remove();
                this.showRateLimitWarning(data.retryAfter || retryAfter || 60);
                const t = (key) => window.translationManager ? window.translationManager.t(key) : key;
                this.addMessage(t('bot_rate_limit'), 'bot');
                // Track rate limit hit
                this.trackAIUsage('chatbot', 'rate_limited');
                return;
            }

            if (!response.ok) throw new Error('API failed');

            const data = await response.json();

            if (data.error) throw new Error(data.error);

            const botReply = data.choices[0].message.content;

            this.conversationHistory.push({ role: "assistant", content: botReply });

            typingDiv.remove();
            this.addMessage(botReply, 'bot');

            // Show remaining requests indicator
            if (remaining !== null && parseInt(remaining) <= 3) {
                this.showRemainingHint(parseInt(remaining));
            }

            // Track successful AI usage
            this.trackAIUsage('chatbot', 'success');

        } catch (error) {
            console.warn("API Error, falling back to local knowledge base:", error);
            typingDiv.remove();

            // Fallback to local dictionary with visible indicator
            const t = (key) => window.translationManager ? window.translationManager.t(key) : key;
            const answer = this.findAnswer(message);
            this.addMessage(answer + "\n\n---\n" + t('bot_offline'), 'bot');
        }

        // Show new suggestions after answer
        setTimeout(() => this.displaySuggestions(), 500);
    }

    findAnswer(question) {
        const lowerQuestion = question.toLowerCase();
        const tokens = lowerQuestion.split(/[\s,.?!]+/); // Simple tokenization
        const t = (key) => window.translationManager ? window.translationManager.t(key) : key;

        // 1. Check Dynamic Project Data first (High Priority)
        if (typeof projectsData !== 'undefined') {
            // Find project where user question contains the ID OR any significant word from title
            const project = projectsData.find(p => {
                const titleWords = p.title.toLowerCase().split(' ').filter(w => w.length > 3);
                return lowerQuestion.includes(p.id.toLowerCase()) ||
                    titleWords.some(word => lowerQuestion.includes(word));
            });

            if (project) {
                const projTitle = t(`proj_${project.id}_title`) || project.title;
                const projSolution = t(`proj_${project.id}_solution`) || project.solution;
                return `**${projTitle}** is a project where Jack addressed: "${project.problem}".\n\n**Solution:** ${projSolution}\n\n**Tech Stack:** ${project.techStack.join(', ')}.`;
            }
        }

        let bestMatch = null;
        let maxScore = 0;
        const kb = getJackKnowledgeBase();

        // Check each knowledge base entry
        for (const [pattern, data] of Object.entries(kb)) {
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
        return t('bot_kb_fallback');
    }

    showRateLimitWarning(retryAfter) {
        const seconds = parseInt(retryAfter);
        const toast = document.createElement('div');
        toast.className = 'rate-limit-toast';
        toast.innerHTML = `
            <div class="rate-limit-icon">⏱️</div>
            <div class="rate-limit-text">
                <strong>Rate limit reached</strong>
                <span class="rate-limit-countdown">Try again in <b>${seconds}s</b></span>
            </div>
        `;
        document.body.appendChild(toast);
        requestAnimationFrame(() => toast.classList.add('visible'));

        let remaining = seconds;
        const countdownEl = toast.querySelector('.rate-limit-countdown b');
        const interval = setInterval(() => {
            remaining--;
            if (remaining <= 0) {
                clearInterval(interval);
                toast.classList.remove('visible');
                setTimeout(() => toast.remove(), 300);
            } else {
                countdownEl.textContent = `${remaining}s`;
            }
        }, 1000);
    }

    showRemainingHint(remaining) {
        const t = (key) => window.translationManager ? window.translationManager.t(key) : key;
        const hint = document.createElement('div');
        hint.className = 'chatbot-message bot-message rate-hint';
        const msg = remaining === 1 ? t('bot_remaining') : t('bot_remaining_plural');
        hint.innerHTML = `<div class="message-content" style="font-size: 0.8rem; opacity: 0.7; padding: 4px 8px;">💡 ${remaining} ${msg}</div>`;
        document.getElementById('chatbot-messages').appendChild(hint);
        setTimeout(() => hint.remove(), 5000);
    }

    trackAIUsage(feature, status) {
        try {
            const key = 'ai_usage_analytics';
            const analytics = JSON.parse(localStorage.getItem(key) || '[]');
            analytics.push({
                feature,
                status,
                timestamp: new Date().toISOString(),
            });
            // Keep last 100 entries
            if (analytics.length > 100) analytics.splice(0, analytics.length - 100);
            localStorage.setItem(key, JSON.stringify(analytics));
        } catch (e) { /* silent */ }
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
            .replace(/(💰|📧|💼|📅|🐙|📄|⏱|📝|👥|🌍|🇮🇱|🇺🇸|🇫🇷|🔔|🔒|🎓)/g, '<span class="emoji">$1</span>');
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
    console.log(' Cloud Chatbot initialized');
});
