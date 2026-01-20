// ========================================
// CLOUD CHATBOT - Jack's Personal Assistant
// ========================================

// Sample questions to display
const sampleQuestions = [
    "Tell me about Hatrick",
    "What is LeAIrn?",
    "What is Jack's inspiration?",
    "Tell me about Scholar2.6",
    "What is SleepCall?",
    "Does Jack know Python?",
    "How can I contact Jack?",
    "What are Jack's main projects?",
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
                "Hi! I'm Cloud ☁️, Jack's AI assistant! I've been updated with his latest projects like **Scholar2.6** and **SleepCall**. Ask me anything!",
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

    addTypingIndicator() {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        const id = 'typing-' + Date.now();
        messageDiv.id = id;
        messageDiv.className = 'chatbot-message bot-message typing-message';
        messageDiv.innerHTML = `
            <img src="images/cloud-bot.jpg" alt="Cloud" class="message-avatar">
            <div class="message-content">
                <div class="typing-dots">
                    <span></span><span></span><span></span>
                </div>
            </div>
        `;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        return id;
    }

    removeMessage(id) {
        const message = document.getElementById(id);
        if (message) {
            message.remove();
        }
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
            .replace(/🎯|💰|🤖|📊|📧|💼|📅|🐙|📄|📚|📈|⏱️|🚀|⚡|🔬|📝|👥|🌍|🇮🇱|🇺🇸|🇫🇷|🔔|🔒|🛡️|🎓|✨|🎁/g, '<span class="emoji">$&</span>');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Resume Customizer Feature - generates tailored pitch based on role description
    startResumeCustomizer() {
        // Open chatbot if not already open
        if (!this.isOpen) {
            this.toggleChat();
        }

        // Clear previous messages
        const messagesContainer = document.getElementById('chatbot-messages');
        messagesContainer.innerHTML = '';

        // Clear suggestions
        const suggestionsContainer = document.getElementById('chatbot-suggestions');
        suggestionsContainer.innerHTML = '';

        // Send intro message
        this.addMessage(
            "✨ **Resume Customizer Mode** ✨\n\nTell me about the role you're hiring for! Include:\n• Job title & company type\n• Key responsibilities\n• Required skills\n• Team size/culture\n\nI'll generate a tailored pitch showing why Jack is the perfect fit!",
            'bot'
        );

        // Add quick prompts for common roles
        this.displayCustomizerSuggestions();

        // Mark that we're in customizer mode
        this.isCustomizerMode = true;
    }

    displayCustomizerSuggestions() {
        const suggestionsContainer = document.getElementById('chatbot-suggestions');
        const suggestions = [
            "Business Analyst at a tech company",
            "AI/ML Product Manager role",
            "Data Analyst for consulting firm",
            "Junior Consultant - strategy"
        ];

        suggestionsContainer.innerHTML = suggestions.map(s =>
            `<button class="suggestion-btn customizer-suggestion" data-question="${s}">${s}</button>`
        ).join('');

        suggestionsContainer.querySelectorAll('.suggestion-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const question = e.target.dataset.question;
                this.handleUserMessage(`Generate a tailored pitch for: ${question}`);
            });
        });
    }

    async handleUserMessage(message) {
        // Add customizer context if in that mode
        const isCustomizerRequest = this.isCustomizerMode || message.toLowerCase().includes('tailored pitch');
        
        // Add user message to chat
        this.addMessage(message, 'user');

        // Show typing indicator
        const typingId = this.addTypingIndicator();

        try {
            // Use absolute URL to Vercel API (works from any host including GitHub Pages)
            const apiUrl = window.location.hostname.includes('vercel.app') 
                ? '/api/chat' 
                : 'https://new-personal-website-topaz.vercel.app/api/chat';
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    message,
                    isResumeCustomizer: isCustomizerRequest
                }),
            });

            const data = await response.json();
            
            // Remove typing indicator
            this.removeMessage(typingId);

            // Add bot response - the API returns answer even on errors
            if (data.answer) {
                this.addMessage(data.answer, 'bot');
            } else {
                this.addMessage("Sorry, I didn't get a proper response. Please try again.", 'bot');
            }

            // Show appropriate suggestions based on mode
            setTimeout(() => {
                if (this.isCustomizerMode) {
                    this.displayCustomizerFollowUp();
                } else {
                    this.displaySuggestions();
                }
            }, 500);

        } catch (error) {
            console.error('Chat Error:', error);
            this.removeMessage(typingId);
            this.addMessage("Sorry, I'm having trouble connecting to the server. Please try again later.", 'bot');
        }

        // Track question
        if (typeof trackCTAClick !== 'undefined') {
            trackCTAClick(isCustomizerRequest ? 'resume_customizer_used' : 'chatbot_question_asked');
        }
    }

    displayCustomizerFollowUp() {
        const suggestionsContainer = document.getElementById('chatbot-suggestions');
        const suggestions = [
            "More technical focus",
            "More leadership examples",
            "Add specific project details",
            "Exit customizer mode"
        ];

        suggestionsContainer.innerHTML = suggestions.map(s =>
            `<button class="suggestion-btn customizer-suggestion" data-question="${s}">${s}</button>`
        ).join('');

        suggestionsContainer.querySelectorAll('.suggestion-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const question = e.target.dataset.question;
                if (question === "Exit customizer mode") {
                    this.isCustomizerMode = false;
                    this.displayWelcomeMessage();
                } else {
                    this.handleUserMessage(question);
                }
            });
        });
    }
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.cloudChatbot = new CloudChatbot();
    console.log('☁️ Cloud Chatbot initialized');
});
