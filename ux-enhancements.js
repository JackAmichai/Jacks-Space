/**
 * UX Visual Enhancements
 * - Scroll Progress Indicator
 * - Page Loader / Skeleton States
 * - Scroll Animations (fade-in on scroll)
 * - Custom Cursor Effects
 * - Parallax Scrolling
 */

(function () {
    'use strict';

    // ==================== 
    // 1. SCROLL PROGRESS INDICATOR
    // ====================
    function initScrollProgress() {
        const progressBar = document.getElementById('scroll-progress');
        if (!progressBar) return;

        function updateProgress() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            progressBar.style.width = progress + '%';
        }

        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress();
    }

    // ==================== 
    // 2. PAGE LOADER
    // ====================
    function initPageLoader() {
        const loader = document.getElementById('page-loader');
        if (!loader) return;

        window.addEventListener('load', () => {
            loader.classList.add('loaded');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        });
    }

    // ==================== 
    // 3. SCROLL ANIMATIONS (Fade-in on scroll)
    // ====================
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll(
            '.section-title, .hobby-card, .book-item, .timeline-item, ' +
            '.skill-item, .tech-group, .testimonial-card, .video-card, ' +
            '.leairn-stat-card, .slide-card, .resource-card-new, .mini-card'
        );

        // Add animation class
        animatedElements.forEach(el => {
            el.classList.add('scroll-animate');
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => observer.observe(el));
    }

    // ==================== 
    // 4. CUSTOM CURSOR EFFECTS
    // ====================
    function initCustomCursor() {
        // Create cursor elements
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-ring"></div>';
        document.body.appendChild(cursor);

        const dot = cursor.querySelector('.cursor-dot');
        const ring = cursor.querySelector('.cursor-ring');

        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;

        // Track mouse position
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.left = mouseX + 'px';
            dot.style.top = mouseY + 'px';
        });

        // Smooth ring follow
        function animateRing() {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            ring.style.left = ringX + 'px';
            ring.style.top = ringY + 'px';
            requestAnimationFrame(animateRing);
        }
        animateRing();

        // Hover effects on interactive elements
        const interactiveElements = document.querySelectorAll(
            'a, button, .btn-primary, .btn-leairn, .video-card, .hobby-card, ' +
            '.book-item, .nav-link, .timeline-item, .skill-item'
        );

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
            });
        });

        // Hide on touch devices
        if ('ontouchstart' in window) {
            cursor.style.display = 'none';
        }
    }

    // ==================== 
    // 5. PARALLAX SCROLLING
    // ====================
    function initParallax() {
        const parallaxElements = document.querySelectorAll('.hero, .leairn-showcase');

        function updateParallax() {
            const scrollY = window.scrollY;

            parallaxElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                const speed = 0.3;

                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const yOffset = (scrollY - el.offsetTop) * speed;
                    el.style.setProperty('--parallax-y', yOffset + 'px');
                }
            });
        }

        window.addEventListener('scroll', updateParallax, { passive: true });
        updateParallax();
    }

    // ==================== 
    // SMOOTH PAGE TRANSITIONS
    // ====================
    function initPageTransitions() {
        // Add transition class to sections
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            section.style.setProperty('--section-index', index);
            section.classList.add('section-transition');
        });
    }

    // ==================== 
    // INITIALIZE ALL
    // ====================
    document.addEventListener('DOMContentLoaded', () => {
        initScrollProgress();
        initPageLoader();
        initScrollAnimations();
        initCustomCursor();
        initParallax();
        initPageTransitions();
    });

})();

// ========================================
// UX ENHANCEMENTS (ADDED)
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initRecruiterMode();
    initSkillSearch();
    initAccessibilityPanel();
    initKeyboardShortcuts();
    initProjectModals();
    initInteractiveTimeline();  // NEW: Interactive timeline feature
});

// ========================================
// INTERACTIVE TIMELINE
// ========================================
function initInteractiveTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item[data-expandable]');
    
    timelineItems.forEach(item => {
        const summary = item.querySelector('.timeline-summary');
        if (!summary) return;
        
        // Click handler to toggle expansion
        summary.addEventListener('click', (e) => {
            // Don't toggle if clicking a link
            if (e.target.tagName === 'A') return;
            
            // Close other expanded items (accordion behavior)
            timelineItems.forEach(other => {
                if (other !== item && other.classList.contains('is-expanded')) {
                    other.classList.remove('is-expanded');
                }
            });
            
            // Toggle this item
            item.classList.toggle('is-expanded');
            
            // Scroll into view if expanding
            if (item.classList.contains('is-expanded')) {
                setTimeout(() => {
                    item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
            }
        });
        
        // Keyboard accessibility
        summary.setAttribute('tabindex', '0');
        summary.setAttribute('role', 'button');
        summary.setAttribute('aria-expanded', 'false');
        
        summary.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                summary.click();
            }
        });
        
        // Update aria-expanded when toggled
        const observer = new MutationObserver(() => {
            summary.setAttribute('aria-expanded', item.classList.contains('is-expanded'));
        });
        observer.observe(item, { attributes: true, attributeFilter: ['class'] });
    });
    
    console.log('📅 Interactive Timeline initialized:', timelineItems.length, 'items');
}

// 1. Recruiter Mode
function initRecruiterMode() {
    const toggle = document.getElementById('recruiterToggle');
    const body = document.body;
    const whyHireMeCard = document.getElementById('whyHireMeCard');

    console.log('🎯 Recruiter Mode Init:', { toggle: !!toggle, whyHireMeCard: !!whyHireMeCard });

    if (toggle) {
        // Check if previously enabled
        if (localStorage.getItem('recruiterMode') === 'true') {
            toggle.checked = true;
            body.classList.add('recruiter-mode');
            if (whyHireMeCard) whyHireMeCard.classList.remove('hidden');
            console.log('🎯 Recruiter Mode restored from localStorage: ON');
        }

        toggle.addEventListener('change', () => {
            console.log('🎯 Recruiter Mode toggle changed:', toggle.checked);
            if (toggle.checked) {
                body.classList.add('recruiter-mode');
                if (whyHireMeCard) whyHireMeCard.classList.remove('hidden');
                localStorage.setItem('recruiterMode', 'true');
                showToast('Recruiter Mode: ON - Highlighting key info');
                console.log('🎯 Recruiter Mode: ON - body classes:', body.classList.toString());
            } else {
                body.classList.remove('recruiter-mode');
                if (whyHireMeCard) whyHireMeCard.classList.add('hidden');
                localStorage.setItem('recruiterMode', 'false');
                showToast('Recruiter Mode: OFF');
                console.log('🎯 Recruiter Mode: OFF - body classes:', body.classList.toString());
            }
        });
    } else {
        console.warn('🎯 Recruiter toggle not found!');
    }
}

// 2. Skill Matcher Search
function initSkillSearch() {
    const searchInput = document.getElementById('skillSearch');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        if (term.length < 2) {
            removeHighlights();
            return;
        }

        // Debounce could be added here, but for simple text it's fine
        highlightText(document.body, term);
    });
}

function highlightText(element, term) {
    removeHighlights();
    
    if (!term) return;

    // Walk through text nodes
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach(node => {
        const parent = node.parentNode;
        // Skip scripts, styles, and already highlighted elements
        if (parent.tagName === 'SCRIPT' || 
            parent.tagName === 'STYLE' || 
            parent.classList.contains('highlight-skill') ||
            parent.closest('.skill-search-wrapper')) return;

        const text = node.nodeValue;
        const index = text.toLowerCase().indexOf(term);

        if (index >= 0) {
            const span = document.createElement('span');
            span.className = 'highlight-skill';
            span.textContent = text.substr(index, term.length);
            
            const after = document.createTextNode(text.substr(index + term.length));
            node.nodeValue = text.substr(0, index);
            
            parent.insertBefore(span, node.nextSibling);
            parent.insertBefore(after, span.nextSibling);
        }
    });
}

function removeHighlights() {
    document.querySelectorAll('.highlight-skill').forEach(span => {
        const parent = span.parentNode;
        parent.replaceChild(document.createTextNode(span.textContent), span);
        parent.normalize();
    });
}

// 3. Accessibility Panel
function initAccessibilityPanel() {
    const trigger = document.getElementById('a11yTrigger');
    const panel = document.getElementById('a11yPanel');
    const close = document.getElementById('a11yClose');
    const body = document.body;
    const storageKey = 'a11y-preferences';

    if (!trigger || !panel) return;

    const defaultPrefs = {
        contrast: false,
        largeText: false,
        reduceMotion: false,
    };

    let preferences;
    try {
        preferences = JSON.parse(localStorage.getItem(storageKey)) || { ...defaultPrefs };
    } catch (error) {
        console.warn('Unable to read accessibility preferences, using defaults.', error);
        preferences = { ...defaultPrefs };
    }

    const toggleConfig = {
        contrast: {
            button: document.getElementById('a11yContrast'),
            className: 'high-contrast',
            onMessage: 'High Contrast: ON',
            offMessage: 'High Contrast: OFF',
        },
        largeText: {
            button: document.getElementById('a11yText'),
            className: 'large-text',
            onMessage: 'Large Text: ON',
            offMessage: 'Large Text: OFF',
        },
        reduceMotion: {
            button: document.getElementById('a11yMotion'),
            className: 'reduce-motion',
            onMessage: 'Reduced Motion: ON',
            offMessage: 'Reduced Motion: OFF',
        },
    };

    function savePreferences() {
        try {
            localStorage.setItem(storageKey, JSON.stringify(preferences));
        } catch (error) {
            console.warn('Unable to save accessibility preferences.', error);
        }
    }

    function applyPreference(key, enabled) {
        const config = toggleConfig[key];
        if (!config) return;

        body.classList.toggle(config.className, enabled);
        if (config.button) {
            config.button.setAttribute('aria-pressed', String(enabled));
        }
    }

    function applyAllPreferences() {
        Object.keys(defaultPrefs).forEach(key => {
            applyPreference(key, Boolean(preferences[key]));
        });
    }

    function openPanel() {
        panel.hidden = false;
        panel.classList.add('is-open');
        panel.setAttribute('aria-hidden', 'false');
        trigger.setAttribute('aria-expanded', 'true');
        const firstButton = panel.querySelector('button');
        if (firstButton) {
            requestAnimationFrame(() => firstButton.focus());
        }
    }

    function closePanel() {
        panel.classList.remove('is-open');
        panel.hidden = true;
        panel.setAttribute('aria-hidden', 'true');
        trigger.setAttribute('aria-expanded', 'false');
    }

    closePanel();
    applyAllPreferences();

    trigger.addEventListener('click', (event) => {
        event.preventDefault();
        if (panel.hidden) {
            openPanel();
        } else {
            closePanel();
        }
    });

    if (close) {
        close.addEventListener('click', (event) => {
            event.preventDefault();
            closePanel();
        });
    }

    document.addEventListener('click', (event) => {
        if (!panel.hidden && !panel.contains(event.target) && event.target !== trigger && !trigger.contains(event.target)) {
            closePanel();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !panel.hidden) {
            closePanel();
        }
    });

    Object.entries(toggleConfig).forEach(([key, config]) => {
        if (!config.button) return;
        config.button.setAttribute('aria-pressed', String(Boolean(preferences[key])));
        config.button.addEventListener('click', () => {
            const nextValue = !preferences[key];
            preferences[key] = nextValue;
            applyPreference(key, nextValue);
            savePreferences();
            showToast(nextValue ? config.onMessage : config.offMessage);
        });
    });
}

// 4. Keyboard Shortcuts
function initKeyboardShortcuts() {
    const helpModal = document.getElementById('kbdHelp');
    
    document.addEventListener('keydown', (e) => {
        // Ignore if typing in input
        if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

        // ? to toggle help
        if (e.key === '?') {
            if (helpModal) {
                if (helpModal.open) helpModal.close();
                else helpModal.showModal();
            }
        }

        // R for Recruiter Mode
        if (e.key.toLowerCase() === 'r') {
            const toggle = document.getElementById('recruiterToggle');
            if (toggle) {
                toggle.checked = !toggle.checked;
                toggle.dispatchEvent(new Event('change'));
            }
        }

        // / for Search
        if (e.key === '/') {
            e.preventDefault();
            const search = document.getElementById('skillSearch');
            if (search) search.focus();
        }
        
        // Esc to close modals (built-in for dialog, but good to ensure)
        if (e.key === 'Escape') {
            const openModals = document.querySelectorAll('dialog[open]');
            openModals.forEach(m => m.close());
        }
    });
}

// 5. Project Modals
function initProjectModals() {
    const modal = document.getElementById('projectModal');
    const closeBtn = document.getElementById('modalClose');
    
    if (!modal) return;

    // Close handlers
    if (closeBtn) closeBtn.addEventListener('click', () => modal.close());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.close();
    });

    // Attach to project cards
    // We look for any element with class 'view-project-btn' or similar
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.view-project-details');
        if (btn) {
            e.preventDefault();
            const projectId = btn.dataset.id;
            openProjectModal(projectId);
        }
    });
}

function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    
    // Ensure projectsData exists
    if (typeof projectsData === 'undefined') {
        console.error('projectsData not loaded');
        return;
    }

    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;

    // Populate Modal
    const titleEl = document.getElementById('modalTitle');
    if (titleEl) titleEl.textContent = project.title;

    const challengeEl = document.getElementById('modalChallenge');
    if (challengeEl) challengeEl.textContent = project.challenge || project.description;

    const solutionEl = document.getElementById('modalSolution');
    if (solutionEl) solutionEl.textContent = project.solution || "Details coming soon...";

    const impactEl = document.getElementById('modalImpact');
    if (impactEl) impactEl.textContent = project.impact || "Impact details coming soon...";

    const linkEl = document.getElementById('modalLink');
    if (linkEl) {
        linkEl.href = project.link || "#";
        linkEl.style.display = project.link ? 'inline-flex' : 'none';
    }
    
    const stackContainer = document.getElementById('modalStack');
    if (stackContainer && project.techStack) {
        stackContainer.innerHTML = project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('');
    }

    modal.showModal();
}

// Helper: Toast Notification
function showToast(message) {
    let toast = document.getElementById('toast');
    // Create toast if it doesn't exist
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    toast.classList.add('show');
    
    // Clear previous timeout if exists
    if (toast.timeoutId) clearTimeout(toast.timeoutId);
    
    toast.timeoutId = setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
