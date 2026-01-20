// ========================================
// PROJECTS DATA STRUCTURE
// Jack Amichai Portfolio - Structured project data for dynamic rendering
// ========================================

const projectsData = [
    {
        id: "hatrick",
        title: "Hatrick: AI Cyber Defense",
        role: "AI Security Architect",
        featured: true,
        image: "https://opengraph.githubassets.com/1/JackAmichai/Hatrick",
        video: "",
        problem: "Simulating complex cyber attacks and defense strategies requires extensive manual effort and expertise, making it hard to train for real-world scenarios.",
        solution: "A real-time cybersecurity platform where autonomous AI agents (Red Team vs Blue Team) battle in simulated scenarios. Features 3D orbital mission selection, live code viewer, and 60+ enterprise features.",
        approach: [
            "Orchestrated <strong>multi-agent voting system</strong> with confidence-weighted scoring",
            "Implemented <strong>40+ MITRE ATT&CK</strong> tactics and techniques",
            "Designed <strong>3D network topology</strong> with real-time attack visualization"
        ],
        outcome: "Live demo at hatrick.vercel.app - demonstrates enterprise-grade cybersecurity simulation.",
        metrics: [
            "🛡️ <strong>60+ features</strong> including APT profiles",
            "⚡ <strong>Sub-second</strong> Groq LPU inference",
            "🤖 <strong>6 AI agents</strong> running simultaneously"
        ],
        techStack: ["React", "TypeScript", "FastAPI", "LangChain", "Groq", "WebSockets"],
        techDetails: "Frontend: Vite + React 18 + TypeScript + Framer Motion + Tailwind. Backend: FastAPI + WebSockets + LangGraph. AI: Groq (Llama-3, Mixtral) for sub-second responses.",
        links: {
            github: "https://github.com/JackAmichai/Hatrick",
            demo: "https://hatrick.vercel.app"
        },
        mediaType: "image",
        mediaUrl: "https://opengraph.githubassets.com/1/JackAmichai/Hatrick",
        evidence: "Live Demo | GitHub Repository"
    },
    {
        id: "pawquest",
        title: "PawQuest: Dog Social App",
        role: "Full Stack Developer",
        featured: true,
        image: "https://paw-quest-f31de0c0.base44.app/Landing",
        video: "video proj/Find Your Pack Today-VEED.mp4",
        problem: "Dog owners struggle to find compatible playmates for their pets and organize social meetups in their local area.",
        solution: "A social platform connecting dog owners to find playmates, organize meetups, and build thriving local pet communities. Features dog profiles, matching, event scheduling, and community forums.",
        approach: [
            "Built <strong>dog profile matching</strong> based on breed, size, and temperament",
            "Implemented <strong>location-based discovery</strong> for local meetups",
            "Created <strong>event scheduling</strong> with RSVP and reminders",
            "Designed <strong>community forums</strong> for pet advice and tips"
        ],
        outcome: "Live app helping dog owners find the perfect playmates for their furry friends.",
        metrics: [
            "🐕 <strong>Dog profiles</strong> with matching",
            "📍 <strong>Location-based</strong> discovery",
            "📅 <strong>Event scheduling</strong> and RSVPs",
            "💬 <strong>Community forums</strong>"
        ],
        techStack: ["React", "Node.js", "Base44", "Mobile-first", "Social Features"],
        techDetails: "Built on Base44 platform with React frontend. Features real-time messaging, geolocation services, and profile matching algorithms.",
        links: {
            github: "https://github.com/base44dev/paw-quest-f31de0c0.git",
            demo: "https://paw-quest-f31de0c0.base44.app/Landing"
        },
        mediaType: "video",
        mediaUrl: "video proj/Find Your Pack Today-VEED.mp4",
        evidence: "Live App | GitHub Repository"
    },
    {
        id: "leairn",
        title: "LeAIrn: Teaching Safe AI",
        role: "Product Lead & Developer",
        featured: true,
        image: "https://placehold.co/600x400/1a1a2e/4ade80?text=LeAIrn+%F0%9F%8E%93",
        video: "",
        problem: "AI hallucinations (17-33% error rate) and bias perpetuate misinformation. Traditional education lacks AI literacy programs to address these critical issues.",
        solution: "An AI-powered education platform teaching safe AI practices: identifying hallucinations, detecting bias, and responsible AI use. Personalized curriculum adapts to each learner's pace.",
        approach: [
            "Developed <strong>interactive modules</strong> on AI hallucinations and bias detection",
            "Integrated <strong>adaptive learning algorithms</strong> to tailor content difficulty",
            "Created <strong>hands-on exercises</strong> for verifying AI-generated content",
            "Built <strong>AI tutors</strong> for real-time assistance"
        ],
        outcome: "Flagship project addressing the EU AI Act's mandate for AI literacy education.",
        metrics: [
            "🧠 <strong>Hallucination detection</strong> training",
            "⚖️ <strong>Bias recognition</strong> modules",
            "🛡️ <strong>Safe AI practices</strong> framework",
            "📊 <strong>Adaptive learning</strong> paths"
        ],
        techStack: ["React", "TypeScript", "Next.js", "LLMs", "Python"],
        techDetails: "Full-stack education platform with LLM-powered content generation, adaptive difficulty algorithms, and interactive exercises.",
        links: {
            github: "https://github.com/JackAmichai/LeAIrn"
        },
        mediaType: "image",
        mediaUrl: "https://placehold.co/600x400/1a1a2e/4ade80?text=LeAIrn+%F0%9F%8E%93",
        evidence: "GitHub Repository"
    },
    {
        id: "nvidia-doc-nav",
        title: "NVIDIA Documentation Navigator",
        role: "Product Lead & Technical Builder",
        featured: true,
        image: "https://opengraph.githubassets.com/1/JackAmichai/Nvidia-doc-agentic-ai",
        video: "",
        problem: "NVIDIA documentation is fragmented across docs.nvidia.com, GitHub, forums - causing slow onboarding and version mismatch errors.",
        solution: "AI-powered unified search agent using RAG to provide version-aware answers from CUDA, TensorRT, NeMo, Triton docs. Features code example generation and step-by-step debugging guides.",
        approach: [
            "Built <strong>unified RAG search</strong> across NVIDIA docs, GitHub, forums",
            "Implemented <strong>version compatibility reasoner</strong> for CUDA/TensorRT combos",
            "Created <strong>code example generator</strong> from public GitHub repos",
            "Designed <strong>step-by-step debugger</strong> for MIG/K8s setup"
        ],
        outcome: "One-stop AI agent for all NVIDIA developer documentation needs.",
        metrics: [
            "⚡ <strong>60% faster</strong> documentation discovery",
            "🎯 <strong>Version-aware</strong> compatibility answers",
            "🔗 <strong>5 core features</strong> in MVP",
            "📚 <strong>Multi-source</strong> RAG retrieval"
        ],
        techStack: ["Python", "FastAPI", "RAG", "Pinecone", "LangChain", "Next.js", "HuggingFace"],
        techDetails: "Backend: FastAPI + LangChain + Pinecone vector DB. Frontend: Next.js + TypeScript. Embeddings: OpenAI text-embedding-ada-002. Retrieves from docs.nvidia.com, GitHub, forums.",
        links: {
            github: "https://github.com/JackAmichai/Nvidia-doc-agentic-ai"
        },
        mediaType: "image",
        mediaUrl: "https://opengraph.githubassets.com/1/JackAmichai/Nvidia-doc-agentic-ai",
        evidence: "GitHub Repository"
    },
    {
        id: "scholar-2-6",
        title: "Scholar2.6: AI Research Navigator",
        role: "Full Stack Developer",
        featured: true,
        image: "https://opengraph.githubassets.com/1/JackAmichai/Scholar2.6",
        video: "",
        problem: "Academic researchers struggle to discover and organize relevant literature across fragmented sources.",
        solution: "A Chrome Extension with AI-driven conversational interface and interactive knowledge graph for academic research discovery. Features iterative intent refinement and Semantic Scholar integration.",
        approach: [
            "Built <strong>AI conversational loop</strong> for iterative query refinement",
            "Created <strong>interactive knowledge graph</strong> with force-directed visualization",
            "Integrated <strong>Semantic Scholar API</strong> with SPECTER2 embeddings",
            "Implemented <strong>Shadow DOM isolation</strong> for any webpage overlay"
        ],
        outcome: "Chrome extension that overlays any webpage with research discovery tools.",
        metrics: [
            "🤖 <strong>AI-powered</strong> intent refinement",
            "🌳 <strong>Interactive</strong> knowledge graph",
            "🔬 <strong>Real paper data</strong> from Semantic Scholar",
            "⚡ <strong>HMR</strong> development experience"
        ],
        techStack: ["TypeScript", "React", "Vite", "Chrome Extension", "Semantic Scholar API", "OpenAI"],
        techDetails: "Chrome Extension with Vite + CRXJS. AI: GPT-4 Turbo with function calling. Graph: Force-directed D3.js visualization. Papers sized by log(citations) with click-to-expand.",
        links: {
            github: "https://github.com/JackAmichai/Scholar2.6"
        },
        mediaType: "image",
        mediaUrl: "https://opengraph.githubassets.com/1/JackAmichai/Scholar2.6",
        evidence: "GitHub Repository"
    },
    {
        id: "sleepcall",
        title: "SleepCall - Meeting Sentinel",
        role: "Python Developer",
        featured: true,
        image: "https://opengraph.githubassets.com/1/JackAmichai/SleepCall",
        video: "",
        problem: "People miss important mentions of their name during long calls while multitasking.",
        solution: "Real-time meeting assistant that detects your name (like 'Hey Siri') and instantly alerts you with an AI-generated 5-minute summary. Features exact + fuzzy matching and multi-channel alerts.",
        approach: [
            "Built <strong>real-time speech recognition</strong> with Azure Speech SDK",
            "Implemented <strong>fuzzy name matching</strong> with RapidFuzz (88% threshold)",
            "Created <strong>rolling 10-minute transcript buffer</strong>",
            "Integrated <strong>Teams/Slack webhooks</strong> + desktop notifications"
        ],
        outcome: "Never miss when your name is mentioned - stay focused and ready to contribute.",
        metrics: [
            "🔔 <strong>Real-time</strong> name detection",
            "🧠 <strong>AI-powered</strong> 5-minute summaries",
            "📢 <strong>Multi-channel</strong> alerts (Teams/Slack/Desktop)",
            "⏱️ <strong>90-second</strong> cooldown protection"
        ],
        techStack: ["Python", "Azure Speech SDK", "Azure OpenAI", "RapidFuzz", "Plyer"],
        techDetails: "Architecture: Audio → Azure Speech SDK (STT) → Rolling Buffer → Name Detection (exact + fuzzy) → LLM Summary → Multi-channel Alert. Modular design with 6 Python modules.",
        links: {
            github: "https://github.com/JackAmichai/SleepCall"
        },
        mediaType: "image",
        mediaUrl: "https://opengraph.githubassets.com/1/JackAmichai/SleepCall",
        evidence: "GitHub Repository | MIT License"
    },
    {
        id: "revenue-optimization",
        title: "Revenue Optimization Platform",
        role: "Business Analyst & Product Strategist",
        featured: true,
        image: "https://placehold.co/600x400/1e293b/60a5fa?text=Revenue+Analytics+%F0%9F%93%8A",
        video: "",
        problem: "Multi-property hotel portfolio struggling with manual pricing decisions based on outdated competitor analysis.",
        solution: "Built demand forecasting models using 3+ years of historical data to automate pricing decisions. Dashboard provides real-time recommendations and competitor tracking.",
        approach: [
            "Built <strong>demand forecasting models</strong> using historical data",
            "Automated <strong>competitor pricing scraping</strong> with daily updates",
            "Designed <strong>Power BI dashboards</strong> showing real-time pricing",
            "Created <strong>scenario planning tools</strong> for demand spikes"
        ],
        outcome: "Improved forecast accuracy and measurable revenue impact across the portfolio.",
        metrics: [
            "📈 <strong>Improved accuracy</strong> in revenue forecasts",
            "💰 <strong>Measurable revenue</strong> impact",
            "⏱️ <strong>60% time saved</strong> on pricing analysis",
            "📊 <strong>Weekly usage</strong> by leadership"
        ],
        techStack: ["Excel", "Power BI", "SQL", "Python", "Revenue Analytics", "Forecasting"],
        techDetails: "Built time-series forecasting models using historical booking patterns. Implemented web scraping automation for competitor rate monitoring. Created interactive Power BI dashboards with drill-down capabilities. Integrated multiple data sources (PMS, market data, events calendar) for holistic view.",
        mediaType: "image",
        mediaUrl: "https://placehold.co/600x400/1e293b/60a5fa?text=Revenue+Analytics+%F0%9F%93%8A",
        evidence: "NDA-protected | Dashboard screenshots available upon request"
    },
    {
        id: "password-research",
        title: "Password Security Research",
        role: "Security Researcher",
        featured: false,
        image: "https://opengraph.githubassets.com/1/JackAmichai/password-research",
        video: "",
        problem: "Understanding common vulnerabilities in password management systems is critical for web security.",
        solution: "A comprehensive research project analyzing password security protocols and common attack vectors. Demonstrates defense mechanisms against brute-force and dictionary attacks.",
        metrics: [
            "🔒 <strong>Vulnerability analysis</strong>",
            "🛡️ <strong>Defense strategies</strong> implemented",
            "🎓 <strong>Academic research</strong> grade"
        ],
        techStack: ["Python", "Cryptography", "Web Security", "Data Analysis"],
        techDetails: "Analyzed password strength entropy and implemented secure hashing comparisons. Simulates attack scenarios to test resilience.",
        links: {
            github: "https://github.com/JackAmichai/password-research"
        },
        mediaType: "image",
        mediaUrl: "https://opengraph.githubassets.com/1/JackAmichai/password-research"
    },
    {
        id: "note2crm",
        title: "Note2CRM",
        role: "AI Product Developer",
        featured: false,
        image: "https://opengraph.githubassets.com/1/JackAmichai/Note2CRM",
        video: "",
        problem: "Sales teams spend hours manually entering meeting notes into CRM systems.",
        solution: "AI-powered meeting assistant that automatically captures, structures, and syncs meeting notes to CRM systems. Uses NLP to extract action items and contact details.",
        metrics: [
            "⏱️ <strong>80% less</strong> manual entry time",
            "📝 <strong>Automated capture</strong> of meeting insights",
            "🎯 <strong>Smart field mapping</strong> to CRM"
        ],
        techStack: ["Python", "NLP", "Speech-to-Text", "CRM APIs", "Machine Learning"],
        techDetails: "Implemented speech recognition using Whisper API. Built named entity recognition (NER) for contact extraction.",
        links: {
            github: "https://github.com/JackAmichai/Note2CRM"
        },
        mediaType: "image",
        mediaUrl: "https://opengraph.githubassets.com/1/JackAmichai/Note2CRM"
    },
    {
        id: "orderflow-ai",
        title: "OrderFlow-AI",
        role: "AI Product Developer",
        featured: false,
        image: "https://opengraph.githubassets.com/1/JackAmichai/OrderFlow-AI",
        video: "",
        problem: "Inventory managers struggle with unpredictable demand patterns leading to stockouts.",
        solution: "Smart order management system using ML to predict demand patterns and optimize inventory levels. Automatically calculates reorder points based on historical sales.",
        metrics: [
            "📉 <strong>45% fewer stockouts</strong>",
            "💰 <strong>Optimized inventory</strong> costs",
            "🤖 <strong>Automated ordering</strong> decisions"
        ],
        techStack: ["Python", "Scikit-learn", "Time Series Analysis", "SQL", "API Integration"],
        techDetails: "Implemented ARIMA and Prophet models for time-series forecasting. Built ensemble approach combining multiple algorithms.",
        links: {
            github: "https://github.com/JackAmichai/OrderFlow-AI"
        },
        mediaType: "image",
        mediaUrl: "https://opengraph.githubassets.com/1/JackAmichai/OrderFlow-AI"
    },
    {
        id: "safyweb",
        title: "SafyWeb",
        role: "Security Product Developer",
        featured: false,
        image: "https://opengraph.githubassets.com/1/JackAmichai/SafyWeb",
        video: "",
        problem: "Small businesses lack affordable, easy-to-use web security tools.",
        solution: "Web security platform that scans for vulnerabilities and provides actionable remediation guidance. Automates checks for OWASP Top 10 threats.",
        metrics: [
            "🔒 <strong>OWASP compliant</strong> scanning",
            "🎯 <strong>Prioritized fixes</strong>",
            "📋 <strong>Clear guidance</strong> for non-technical users"
        ],
        techStack: ["Python", "Security Testing", "OWASP", "Web Scanning", "API Development"],
        techDetails: "Implemented automated scanning for SQL injection, XSS, CSRF. Built severity scoring based on CVSS.",
        links: {
            github: "https://github.com/JackAmichai/SafyWeb"
        },
        mediaType: "image",
        mediaUrl: "https://opengraph.githubassets.com/1/JackAmichai/SafyWeb"
    },
    {
        id: "artibus",
        title: "ArtiBus",
        role: "AI Product Developer",
        featured: false,
        image: "https://opengraph.githubassets.com/1/JackAmichai/ArtiBus",
        video: "",
        problem: "Public transport users struggle with complex route planning during service disruptions.",
        solution: "AI-powered public transport assistant with intelligent route optimization and real-time alerts. Helps users navigate disruptions with alternative route suggestions.",
        metrics: [
            "🚌 <strong>Real-time route</strong> optimization",
            "⚠️ <strong>Proactive alerts</strong> for disruptions",
            "🗺️ <strong>Multi-modal</strong> journey planning"
        ],
        techStack: ["Python", "Route Optimization", "Real-time APIs", "NLP", "Mobile Development"],
        techDetails: "Integrated GTFS feeds for transit data. Implemented Dijkstra's algorithm with custom cost function.",
        links: {
            github: "https://github.com/JackAmichai/ArtiBus"
        },
        mediaType: "image",
        mediaUrl: "https://opengraph.githubassets.com/1/JackAmichai/ArtiBus"
    },
    {
        id: "stock-predictor",
        title: "Stock Price Prediction Model",
        role: "ML Engineer",
        featured: false,
        image: "https://opengraph.githubassets.com/1/JackAmichai/stock-predictor",
        video: "",
        problem: "Investors need reliable tools to analyze stock price trends.",
        solution: "Machine learning model achieving 85%+ accuracy using RandomForestRegressor. Engineers 15+ features from historical market data for robust predictions.",
        metrics: [
            "🎯 <strong>85%+ accuracy</strong>",
            "📊 <strong>15+ features</strong> engineered",
            "⚡ <strong>Real-time pipeline</strong>"
        ],
        techStack: ["Python", "Scikit-learn", "Pandas", "Machine Learning", "Financial Data APIs"],
        techDetails: "Implemented feature engineering including moving averages, RSI, MACD. Used RandomForestRegressor with hyperparameter tuning.",
        links: {
            github: "https://github.com/JackAmichai/stock-predictor"
        },
        mediaType: "image",
        mediaUrl: "https://opengraph.githubassets.com/1/JackAmichai/stock-predictor"
    },
    {
        id: "ecommerce-recommendation",
        title: "E-commerce Recommendation Engine",
        role: "ML Product Developer",
        featured: false,
        image: "https://opengraph.githubassets.com/1/JackAmichai/ecommerce-recommendations",
        video: "",
        problem: "Online shoppers are overwhelmed by product choices.",
        solution: "Personalized product recommendation system increasing conversion rates by 25%. Utilizes collaborative filtering and behavioral analysis to suggest relevant items.",
        metrics: [
            "📈 <strong>25% conversion boost</strong>",
            "🎯 <strong>Personalized</strong> recommendations",
            "⚡ <strong>Real-time</strong> adaptation"
        ],
        techStack: ["Python", "Collaborative Filtering", "A/B Testing", "Redis", "Real-time Analytics"],
        techDetails: "Implemented matrix factorization using Surprise library. Built hybrid approach combining collaborative and content-based filtering.",
        links: {
            github: "https://github.com/JackAmichai/ecommerce-recommendations"
        },
        mediaType: "image",
        mediaUrl: "https://opengraph.githubassets.com/1/JackAmichai/ecommerce-recommendations"
    },
    {
        id: "sap-successfactors",
        title: "SAP SuccessFactors Extensions",
        role: "Solution Architect",
        featured: false,
        image: "https://placehold.co/600x400/0a66c2/ffffff?text=SAP+BTP+Extensions",
        video: "",
        problem: "Enterprise clients need custom HR workflows outside standard capabilities.",
        solution: "Custom SAP BTP extensions for SuccessFactors, implementing specialized approval workflows and data integration. Ensures seamless connectivity with legacy systems.",
        metrics: [
            "🏛️ <strong>Enterprise exposure</strong>",
            "📚 <strong>SAP BTP knowledge</strong>",
            "🔧 <strong>Custom extensions</strong> understanding"
        ],
        techStack: ["SAP BTP", "SAP SuccessFactors", "JavaScript", "OData", "Cloud Foundry", "Integration"],
        techDetails: "Built custom SAP UI5 applications deployed on BTP. Implemented OData services for data access. Created integration flows using SAP Cloud Integration. Designed multi-tenant architecture for scalability. Established CI/CD pipelines for extension deployments.",
        mediaType: "image",
        mediaUrl: "https://placehold.co/600x400/1e293b/4ade80?text=SAP+SuccessFactors+Extensions",
        evidence: "NDA-protected Fortune 500 implementations | Client references available"
    }
];

// View types for toggle functionality
const ViewType = {
    BUSINESS: 'business',
    TECHNICAL: 'technical'
};

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { projectsData, ViewType };
}
