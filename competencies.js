/**
 * Core Competencies Interaction Logic
 * Handles the "Evidence Panel" for technical strengths.
 */

(function() {
    'use strict';

    const competencyData = {
        'ai-ml': {
            title: 'AI & ML',
            evidence: [
                { title: 'NVIDIA Doc Navigator', desc: 'Built an AI-powered developer assistant for NVIDIA\'s technical documentation ecosystem using advanced RAG.' },
                { title: 'Hatrick Multi-Agent System', desc: 'Engineered a system with 6+ autonomous agents requiring sub-second coordination for cyber defense simulations.' },
                { title: 'Note2CRM', desc: 'Developed an AI plugin that converts unstructured chat messages into actionable CRM tasks.' }
            ]
        },
        'arch': {
            title: 'Architecture',
            evidence: [
                { title: 'SAP Certified Solution Architect', desc: 'Certified in SAP BTP, architecting enterprise-grade cloud solutions.' },
                { title: 'Deloitte Architecture Lead', desc: 'Led technical design for complex SAP SuccessFactors transformations, ensuring scalable system integration.' }
            ]
        },
        'infra': {
            title: 'Infrastructure',
            evidence: [
                { title: 'AWS Cloud Practitioner', desc: 'Certified in cloud fundamentals, managing secure and scalable infrastructure.' },
                { title: 'Groq LPU Optimization', desc: 'Optimized inference speeds for real-time AI agents, achieving 10x faster performance over standard LLM providers.' }
            ]
        },
        'ux-hci': {
            title: 'UX & HCI',
            evidence: [
                { title: 'PawQuest Design', desc: 'Applied human-centric design principles to a dog-owner social platform, focusing on seamless user journeys.' },
                { title: 'Neuroscience Background', desc: 'Leveraged academic research in cognition to build systems that align with human mental models and reduce friction.' }
            ]
        },
        'product': {
            title: 'Product',
            evidence: [
                { title: 'Deloitte Product Strategy', desc: 'Authored PRDs and led workshops to translate vague business requirements into actionable technical backlogs.' },
                { title: 'Market-Ready Prototypes', desc: 'Took project from concept to live deployment (hatrick.vercel.app), focusing on user value and product-market fit.' }
            ]
        },
        'comm': {
            title: 'Communication',
            evidence: [
                { title: 'Business-Tech Bridge', desc: 'Expert in translating complex AI architectures to executive stakeholders and non-technical clients.' },
                { title: 'International Workshops', desc: 'Led collaborative sessions across diverse teams to align technical strategy with business outcomes.' }
            ]
        }
    };

    window.showCompetencyEvidence = function(key) {
        const data = competencyData[key];
        if (!data) return;

        const modal = document.getElementById('competencyModal');
        const title = document.getElementById('compModalTitle');
        const list = document.getElementById('compModalList');

        title.textContent = data.title + ' Evidence';
        list.innerHTML = data.evidence.map(item => `
            <div class="evidence-item">
                <h5>${item.title}</h5>
                <p>${item.desc}</p>
            </div>
        `).join('');

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeCompetencyModal = function() {
        const modal = document.getElementById('competencyModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

})();
