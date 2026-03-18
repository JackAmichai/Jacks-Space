// ========================================
// PROJECTS DATA STRUCTURE
// Jack Amichai Portfolio - Structured project data for dynamic rendering
// ========================================

const projectsData = [
    {
        id: "hatrick",
        title: "Hatrick: AI Cyber Defense",
        role: "Multi-Agent System Architect",
        featured: true,
        image: "https://opengraph.githubassets.com/1/JackAmichai/Hatrick",
        video: "video proj/Project_Video_Generation_With_Music.mp4",
        problem: "Cyber defense training lacks realistic, autonomous adversaries that adapt to defender actions in real-time.",
        solution: "A Multi-Agent System using LangChain and Groq to model autonomous cyber attack/defense scenarios. 6+ autonomous agents simulate Red Team vs Blue Team battles with sub-second inference.",
        approach: [
            "Designed <strong>multi-agent orchestration</strong> using LangChain",
            "Implemented <strong>Groq LPU integration</strong> for sub-second inference",
            "Modeled <strong>autonomous decision loops</strong> for attack/defense agents"
        ],
        outcome: "Autonomous simulation environment for testing security protocols against adaptive AI adversaries.",
        metrics: [
            " <strong>6+ Autonomous Agents</strong> interacting",
            " <strong>Sub-second</strong> inference on Groq",
            " <strong>Real-time</strong> protocol testing"
        ],
        techStack: ["React", "TypeScript", "FastAPI", "LangChain", "Groq"],
        techDetails: "Frontend: React + TypeScript. Backend: FastAPI + LangChain. Orchestration: LangGraph. Inference: Groq LPU (Llama-3, Mixtral).",
        links: {
            github: "https://github.com/JackAmichai/Hatrick",
            demo: "https://hatrick.vercel.app"
        },
        mediaType: "video",
        mediaUrl: "video proj/Project_Video_Generation_With_Music.mp4",
        evidence: "Live Demo | GitHub Repository"
    },
    {
        id: "learn-machine-learn",
        title: "Learn Machine Learn",
        role: "JavaScript Developer",
        featured: true,
        image: "PROJ shots/LML SHOT.png",
        video: "Machine_Learning_Demo_Ad_Creation.mp4",
        problem: "Grasp complex machine learning concepts through interactive visualizations and educational resources.",
        solution: "A collection of interactive machine learning educational tools and resources designed to simplify complex AI concepts for developers and students.",
        approach: [
            "Built <strong>interactive visualizations</strong> for core ML algorithms",
            "Developed <strong>hands-on coding exercises</strong> in JavaScript",
            "Created <strong>comprehensive documentation</strong> and learning paths"
        ],
        outcome: "A resource for developers to learn ML fundamentals through code and visual feedback.",
        metrics: [
            "🎓 <strong>Educational focus</strong>",
            "💻 <strong>Interactive code</strong> examples",
            "📊 <strong>Visual intuition</strong> tools"
        ],
        techStack: ["JavaScript", "D3.js", "ML Fundamentals", "Web Dev"],
        techDetails: "Frontend: JavaScript with D3.js for interactive visualizations. Educational content structured for progressive learning of ML concepts.",
        links: {
            github: "https://github.com/JackAmichai/Learn-Machine-Learn",
            demo: "https://learn-machine-learn.vercel.app/"
        },
        mediaType: "video",
        mediaUrl: "Machine_Learning_Demo_Ad_Creation.mp4",
        evidence: "GitHub Repository | Live Demo"
    },
    {
        id: "pawquest",
        title: "PawQuest: Dog Social App",
        role: "Full Stack Developer",
        featured: true,
        image: "PROJ shots/PAW SHOT.png",
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
            " <strong>Community forums</strong>"
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
            "⚖ <strong>Bias recognition</strong> modules",
            " <strong>Safe AI practices</strong> framework",
            " <strong>Adaptive learning</strong> paths"
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
        image: "images/hero-bg-1.jpg",
        // video: "videos/nvidia_demo.mp4", // Removed placeholder
        problem: "NVIDIA engineers and developers waste 2-3 hours daily searching across fragmented documentation for CUDA, Triton, TensorRT, and NeMo.",
        solution: "A retrieval-augmented generation (RAG) system with semantic search that synthesizes insights from multiple documentation sources. Features intelligent filtering and conversational UI for complex technical queries.",
        approach: [
            "Built <strong>unified RAG search</strong> across NVIDIA docs, GitHub, forums",
            "Implemented <strong>version compatibility reasoner</strong> for CUDA/TensorRT combos",
            "Created <strong>code example generator</strong> from public GitHub repos",
            "Designed <strong>step-by-step debugger</strong> for MIG/K8s setup"
        ],
        outcome: "One-stop AI agent for all NVIDIA developer documentation needs.",
        metrics: [
            " <strong>60% faster</strong> documentation discovery",
            " <strong>Version-aware</strong> compatibility answers",
            "🔗 <strong>5 core features</strong> in MVP",
            " <strong>Multi-source</strong> RAG retrieval"
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
        title: "Scholar2.6 & Note2CRM",
        role: "Full Stack Developer",
        featured: true,
        image: "images/hero-bg-2.jpg",
        // video: "videos/scholar_demo.mp4", // Removed placeholder
        problem: "Academic researchers struggle to manage and organize vast amounts of literature efficiently.",
        solution: "A modern academic search and organization tool built with TypeScript. Streamlines the research process with intuitive library management and citation tools.",
        approach: [
            "Developed <strong>Manifest V3 extensions</strong> for browser automation",
            "Implemented <strong>unstructured data parsing</strong> from varying DOMs",
            "Built <strong>knowledge graph visualization</strong> for research papers",
            "Optimized <strong>research and sales workflows</strong> through direct integration"
        ],
        outcome: "Streamlined data entry and discovery for both academic and sales use cases.",
        metrics: [
            "🧩 <strong>Manifest V3</strong> architecture",
            " <strong>Knowledge Graph</strong> visualization",
            "🔄 <strong>Auto-sync</strong> to external platforms",
            " <strong>Productivity boost</strong> for workflows"
        ],
        techStack: ["TypeScript", "React", "Chrome Extension", "Manifest V3", "Semantic Scholar API"],
        techDetails: "Chrome Extensions built with React/Vite. Content scripts for DOM parsing. Background service workers for API sync. Shadow DOM for UI overlay.",
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
        featured: false,
        image: "images/hero-bg-3.jpg",
        // video: "videos/sleepcall_demo.mp4", // Removed placeholder
        problem: "People often miss important mentions of their name during long calls or while multitasking.",
        solution: "An intelligent audio monitoring tool that alerts you whenever your name is spoken in a call. Uses lightweight speech recognition to run locally without compromising privacy.",
        metrics: [
            "🔔 <strong>Real-time alerts</strong>",
            "🔒 <strong>Privacy-focused</strong> local processing",
            " <strong>Low latency</strong> detection"
        ],
        outcome: "Never miss when your name is mentioned - stay focused and ready to contribute.",
        metrics: [
            "🔔 <strong>Real-time</strong> name detection",
            "🧠 <strong>AI-powered</strong> 5-minute summaries",
            "📢 <strong>Multi-channel</strong> alerts (Teams/Slack/Desktop)",
            "⏱ <strong>90-second</strong> cooldown protection"
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
        image: "images/hero-bg-2.jpg",
        // video: "videos/revenue_demo.mp4", // Removed placeholder
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
            " <strong>Improved accuracy</strong> in revenue forecasts",
            "💰 <strong>Measurable revenue</strong> impact",
            "⏱ <strong>60% time saved</strong> on pricing analysis",
            " <strong>Weekly usage</strong> by leadership"
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
        image: "images/hero-bg-1.jpg",
        // video: "videos/security_demo.mp4", // Removed placeholder
        problem: "Understanding common vulnerabilities in password management systems is critical for web security.",
        solution: "A comprehensive research project analyzing password security protocols and common attack vectors. Demonstrates defense mechanisms against brute-force and dictionary attacks.",
        metrics: [
            "🔒 <strong>Vulnerability analysis</strong>",
            " <strong>Defense strategies</strong> implemented",
            "🎓 <strong>Academic research</strong> grade"
        ],
        techStack: ["Python", "Cryptography", "Web Security", "Data Analysis"],
        techDetails: "Analyzed password strength entropy and implemented secure hashing comparisons. Simulates attack scenarios to test resilience.",
        links: {
            github: "https://github.com/JackAmichai/password-research"
        }
    },
    {
        id: "note2crm",
        title: "Note2CRM",
        role: "AI Product Developer",
        featured: false,
        image: "images/hero-bg-3.jpg",
        // video: "videos/note2crm_demo.mp4", // Removed placeholder
        problem: "Sales teams spend hours manually entering meeting notes into CRM systems.",
        solution: "AI-powered meeting assistant that automatically captures, structures, and syncs meeting notes to CRM systems. Uses NLP to extract action items and contact details.",
        metrics: [
            "⏱ <strong>80% less</strong> manual entry time",
            "📝 <strong>Automated capture</strong> of meeting insights",
            " <strong>Smart field mapping</strong> to CRM"
        ],
        techStack: ["Python", "NLP", "Speech-to-Text", "CRM APIs", "Machine Learning"],
        techDetails: "Implemented speech recognition using Whisper API. Built named entity recognition (NER) for contact extraction.",
        links: {
            github: "https://github.com/JackAmichai/Note2CRM"
        }
    },

    {
        id: "orderflow-ai",
        title: "OrderFlow-AI",
        role: "AI Product Developer",
        featured: false,
        image: "images/hero-bg-4.jpg",
        // video: "videos/orderflow_demo.mp4", // Removed placeholder
        problem: "Inventory managers struggle with unpredictable demand patterns leading to stockouts.",
        solution: "Smart order management system using ML to predict demand patterns and optimize inventory levels. Automatically calculates reorder points based on historical sales.",
        metrics: [
            "📉 <strong>45% fewer stockouts</strong>",
            "💰 <strong>Optimized inventory</strong> costs",
            " <strong>Automated ordering</strong> decisions"
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
        id: "openhouse",
        title: "OpenHouse",
        role: "Python Developer",
        featured: false,
        image: "https://placehold.co/600x400/2c3e50/ffffff?text=OpenHouse",
        video: "",
        problem: "Real estate price transparency is limited.",
        solution: "Real prices of property analysis tool.",
        metrics: [],
        techStack: ["Python", "Data Analysis"],
        techDetails: "Real estate data analysis and pricing tool.",
        links: {
            github: "https://github.com/JackAmichai/OpenHouse"
        },
        mediaType: "image",
        mediaUrl: "https://placehold.co/600x400/2c3e50/ffffff?text=OpenHouse"
    },
    {
        id: "ghostorc",
        title: "GhostOrc-",
        role: "Kotlin Developer",
        featured: false,
        image: "https://placehold.co/600x400/5e35b1/ffffff?text=GhostOrc",
        video: "",
        problem: "Orchestrating LLMs can be complex.",
        solution: "Ghost LLM orchestrater.",
        metrics: [],
        techStack: ["Kotlin", "LLM"],
        techDetails: "LLM Orchestration layer built in Kotlin.",
        links: {
            github: "https://github.com/JackAmichai/GhostOrc-"
        },
        mediaType: "image",
        mediaUrl: "https://placehold.co/600x400/5e35b1/ffffff?text=GhostOrc"
    },
    {
        id: "3dasmov",
        title: "3dAsmov",
        role: "C Developer",
        featured: false,
        image: "https://placehold.co/600x400/e53935/ffffff?text=3dAsmov",
        video: "",
        problem: "Robotics ethics implementation.",
        solution: "Ethics in robotics framework.",
        metrics: [],
        techStack: ["C", "Robotics"],
        techDetails: "Low-level C implementation of ethical constraints for robotics.",
        links: {
            github: "https://github.com/JackAmichai/3dAsmov"
        },
        mediaType: "image",
        mediaUrl: "https://placehold.co/600x400/e53935/ffffff?text=3dAsmov"
    },
    {
        id: "flashcorp",
        title: "FlashCorp",
        role: "TypeScript Developer",
        featured: false,
        image: "https://placehold.co/600x400/fb8c00/ffffff?text=FlashCorp",
        video: "",
        problem: "",
        solution: "TypeScript project.",
        metrics: [],
        techStack: ["TypeScript"],
        techDetails: "",
        links: {
            github: "https://github.com/JackAmichai/FlashCorp"
        },
        mediaType: "image",
        mediaUrl: "https://placehold.co/600x400/fb8c00/ffffff?text=FlashCorp"
    },
    {
        id: "teaisty",
        title: "TeAisty",
        role: "JavaScript Developer",
        featured: false,
        image: "https://placehold.co/600x400/8d6e63/ffffff?text=TeAisty",
        video: "",
        problem: "",
        solution: "JavaScript project.",
        metrics: [],
        techStack: ["JavaScript"],
        techDetails: "",
        links: {
            github: "https://github.com/JackAmichai/TeAisty"
        },
        mediaType: "image",
        mediaUrl: "https://placehold.co/600x400/8d6e63/ffffff?text=TeAisty"
    },
    {
        id: "onering",
        title: "OneRing",
        role: "Developer",
        featured: false,
        image: "https://placehold.co/600x400/ffa726/ffffff?text=OneRing",
        video: "",
        problem: "Tool management fragmentation.",
        solution: "One tool to rule them all.",
        metrics: [],
        techStack: ["Tooling"],
        techDetails: "Unified tooling platform.",
        links: {
            github: "https://github.com/JackAmichai/OneRing"
        },
        mediaType: "image",
        mediaUrl: "https://placehold.co/600x400/ffa726/ffffff?text=OneRing"
    },
    {
        id: "safyweb",
        title: "SafyWeb",
        role: "Security Product Developer",
        featured: false,
        image: "images/hero-bg-1.jpg",
        // video: "videos/safyweb_demo.mp4", // Removed placeholder
        problem: "Small businesses lack affordable, easy-to-use web security tools.",
        solution: "Web security platform that scans for vulnerabilities and provides actionable remediation guidance. Automates checks for OWASP Top 10 threats.",
        metrics: [
            "🔒 <strong>OWASP compliant</strong> scanning",
            " <strong>Prioritized fixes</strong>",
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
        image: "images/hero-bg-2.jpg",
        // video: "videos/artibus_demo.mp4", // Removed placeholder
        problem: "Public transport users struggle with complex route planning during service disruptions.",
        solution: "AI-powered public transport assistant with intelligent route optimization and real-time alerts. Helps users navigate disruptions with alternative route suggestions.",
        metrics: [
            "🚌 <strong>Real-time route</strong> optimization",
            "⚠ <strong>Proactive alerts</strong> for disruptions",
            "🗺 <strong>Multi-modal</strong> journey planning"
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
        image: "images/hero-bg-3.jpg",
        // video: "videos/stock_demo.mp4", // Removed placeholder
        problem: "Investors need reliable tools to analyze stock price trends.",
        solution: "Machine learning model achieving 85%+ accuracy using RandomForestRegressor. Engineers 15+ features from historical market data for robust predictions.",
        metrics: [
            " <strong>85%+ accuracy</strong>",
            " <strong>15+ features</strong> engineered",
            " <strong>Real-time pipeline</strong>"
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
        image: "images/hero-bg-4.jpg",
        // video: "videos/ecommerce_demo.mp4", // Removed placeholder
        problem: "Online shoppers are overwhelmed by product choices.",
        solution: "Personalized product recommendation system increasing conversion rates by 25%. Utilizes collaborative filtering and behavioral analysis to suggest relevant items.",
        metrics: [
            " <strong>25% conversion boost</strong>",
            " <strong>Personalized</strong> recommendations",
            " <strong>Real-time</strong> adaptation"
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
        image: "images/hero-bg-1.jpg",
        // video: "videos/sap_demo.mp4", // Removed placeholder
        problem: "Enterprise clients need custom HR workflows outside standard capabilities.",
        solution: "Custom SAP BTP extensions for SuccessFactors, implementing specialized approval workflows and data integration. Ensures seamless connectivity with legacy systems.",
        metrics: [
            " <strong>Enterprise exposure</strong>",
            " <strong>SAP BTP knowledge</strong>",
            " <strong>Custom extensions</strong> understanding"
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
