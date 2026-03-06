// ========================================
// JACK AMICHAI PORTFOLIO - ENHANCED SCRIPT
// 20+ Interactive Features
// ========================================

// ========================================
// 1. PAGE LOADER - Fast load using DOMContentLoaded
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('pageLoader');
    if (loader) {
        // Hide loader quickly once DOM is ready (don't wait for all images)
        setTimeout(() => {
            loader.classList.add('fade-out');
            setTimeout(() => loader.style.display = 'none', 300);
        }, 200);
    }
});

// ========================================
// 2. HERO PHOTO ROTATION (DISABLED)
// ========================================
/*
(function() {
    const heroImage = document.querySelector('.hero-image');
    if (!heroImage) return;
    
    const photos = [
        'images/me.jpeg',
        'images/hero-bg-1.jpg',
        'images/hero-bg-2.jpg',
        'images/hero-bg-3.jpg',
        'images/hero-bg-4.jpg'
    ];

    let currentIndex = 0;

    function rotatePhoto() {
        currentIndex = (currentIndex + 1) % photos.length;
        heroImage.style.opacity = '0';

        setTimeout(() => {
            heroImage.src = photos[currentIndex];
            heroImage.style.opacity = '1';
        }, 500);
    }

    // Add transition style
    heroImage.style.transition = 'opacity 0.5s ease-in-out';

    // Rotate every 6 seconds
    setInterval(rotatePhoto, 6000);
})();
*/

// ========================================
// 3. SMOOTH SCROLLING
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || !href) return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Close mobile menu if open
            const navMenu = document.getElementById('navMenu');
            if (navMenu) navMenu.classList.remove('active');
            const mobileToggle = document.getElementById('mobileMenuToggle');
            if (mobileToggle) mobileToggle.classList.remove('active');
        }
    });
});

// ========================================
// 4. SCROLL PROGRESS BAR
// ========================================
function updateScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    if (!scrollProgress) return;

    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// ========================================
// 4. NAVBAR SCROLL EFFECT
// ========================================
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;

    // Add shadow on scroll
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScrollTop = scrollTop;
});

// ========================================
// 7. MOBILE MENU TOGGLE
// ========================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
}

// ========================================
// 6. DARK MODE TOGGLE
// ========================================
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme') || 'light';
root.setAttribute('data-theme', currentTheme);

if (themeToggle) {
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', () => {
        const theme = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        root.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeIcon(theme);
        showToast(`${theme === 'dark' ? 'Dark' : 'Light'} mode activated`);
    });
}

function updateThemeIcon(theme) {
    const icon = themeToggle?.querySelector('.theme-icon');
    if (icon) {
        icon.textContent = theme === 'dark' ? '☀' : '🌙';
    }
}

// ========================================
// 6.5 ACCESSIBILITY TOGGLE
// ========================================
const accessibilityToggle = document.getElementById('accessibilityToggle');
const accessibilityMenu = document.getElementById('accessibilityMenu');

// Options
const a11yOptions = {
    'largeText': 'large-text',
    'highContrast': 'high-contrast',
    'highlightLinks': 'highlight-links',
    'dyslexicFont': 'dyslexic-font'
};

// Initialize options from localStorage
Object.entries(a11yOptions).forEach(([key, className]) => {
    const isEnabled = localStorage.getItem(`a11y_${key}`) === 'true';
    if (isEnabled) {
        document.body.classList.add(className);
    }
    const checkbox = document.getElementById(`a11y-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`);
    if (checkbox) {
        checkbox.checked = isEnabled;

        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.body.classList.add(className);
                localStorage.setItem(`a11y_${key}`, 'true');
            } else {
                document.body.classList.remove(className);
                localStorage.setItem(`a11y_${key}`, 'false');
            }
        });
    }
});

if (accessibilityToggle && accessibilityMenu) {
    accessibilityToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        accessibilityMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!accessibilityMenu.contains(e.target) && e.target !== accessibilityToggle) {
            accessibilityMenu.classList.remove('active');
        }
    });

    // Prevent closing menu when clicking inside
    accessibilityMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// ========================================
// 7. TYPING ANIMATION
// ========================================
const typingElements = document.querySelectorAll('.typing-text');
typingElements.forEach(element => {
    const text = element.getAttribute('data-text') || element.textContent;
    element.textContent = '';
    let charIndex = 0;

    function type() {
        if (charIndex < text.length) {
            element.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        }
    }

    // Start typing after short delay
    setTimeout(type, 500);
});

// ========================================
// 8. COPY EMAIL BUTTON
// ========================================
const copyEmailBtn = document.getElementById('copyEmailBtn');
if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
        const email = copyEmailBtn.getAttribute('data-email');
        navigator.clipboard.writeText(email).then(() => {
            showToast('📧 Email copied to clipboard!');
            trackCTAClick('email_copied');
        }).catch(err => {
            showToast('Failed to copy email');
        });
    });
}

// ========================================
// 9. SOCIAL SHARE FUNCTIONS
// ========================================
function shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=600,height=400');
    trackCTAClick('share_linkedin');
}

function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Check out Jack Amichai\'s impressive AI Product Management portfolio!');
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
    trackCTAClick('share_twitter');
}

function copyProfileLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        showToast('🔗 Profile link copied!');
        trackCTAClick('link_copied');
    });
}

// ========================================
// 10. PROJECT FILTERS
// ========================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card[data-category]');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter projects
        projectCards.forEach(card => {
            const categories = card.getAttribute('data-category');
            if (filter === 'all' || categories.includes(filter)) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s';
            } else {
                card.style.display = 'none';
            }
        });

        trackCTAClick(`filter_${filter}`);
    });
});

// ========================================
// 11. SKILLS PROGRESS BARS ANIMATION
// ========================================
const observeSkills = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillFills = entry.target.querySelectorAll('.skill-fill');
            skillFills.forEach(fill => {
                const skillValue = fill.getAttribute('data-skill');
                setTimeout(() => {
                    fill.style.width = skillValue + '%';
                }, 200);
            });
            observeSkills.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skills-grid').forEach(grid => {
    observeSkills.observe(grid);
});

// ========================================
// 12. INTERSECTION OBSERVER - FADE IN
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.section, .project-card, .timeline-item, .testimonial-card, .download-card').forEach(el => {
    observer.observe(el);
});

// ========================================
// 13. ACTIVE NAV LINK HIGHLIGHTING
// ========================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavLink() {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ========================================
// 14. BACK TO TOP BUTTON
// ========================================
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        trackCTAClick('back_to_top');
    });
}

// ========================================
// 15. FORM VALIDATION & ENHANCEMENT
// ========================================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        // Basic validation
        if (nameInput && nameInput.value.trim().length < 2) {
            e.preventDefault();
            showToast('⚠ Please enter a valid name');
            nameInput.focus();
            return;
        }

        if (emailInput && !isValidEmail(emailInput.value)) {
            e.preventDefault();
            showToast('⚠ Please enter a valid email address');
            emailInput.focus();
            return;
        }

        if (messageInput && messageInput.value.trim().length < 10) {
            e.preventDefault();
            showToast('⚠ Please enter a message (at least 10 characters)');
            messageInput.focus();
            return;
        }

        showToast(' Message sent successfully!');
        trackCTAClick('contact_form_submitted');
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ========================================
// 16. VISITOR COUNTER
// ========================================
function updateVisitorCount() {
    const visitorCountEl = document.getElementById('visitorCount');
    if (!visitorCountEl) return;

    let count = parseInt(localStorage.getItem('visitorCount') || '0');

    // Check if user visited today
    const lastVisit = localStorage.getItem('lastVisit');
    const today = new Date().toDateString();

    if (lastVisit !== today) {
        count++;
        localStorage.setItem('visitorCount', count);
        localStorage.setItem('lastVisit', today);
    }

    // Animate count
    animateCount(visitorCountEl, count);
}

function animateCount(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 20);
}

updateVisitorCount();

// ========================================
// 17. TOAST NOTIFICATIONS
// ========================================
function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// ========================================
// 18. KEYBOARD SHORTCUTS
// ========================================
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + D: Toggle dark mode
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        themeToggle?.click();
    }

    // Escape: Close mobile menu
    if (e.key === 'Escape') {
        navMenu?.classList.remove('active');
        mobileMenuToggle?.classList.remove('active');
    }
});

// ========================================
// 19. ANALYTICS TRACKING
// ========================================
function trackPageView() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            page_path: window.location.pathname
        });
    }
}

function trackCTAClick(ctaName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'cta_click', {
            event_category: 'engagement',
            event_label: ctaName,
            value: 1
        });
    }
}

// Track page view on load
trackPageView();

// ========================================
// 20. DYNAMIC PROJECTS RENDERING (ENHANCED)
// ========================================

// Generate SVG Visuals for each project
function getProjectVisual(projectId) {
    const visuals = {
        'nvidia-doc-nav': `
            <svg class="visual-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="15" class="visual-node" fill-opacity="0.2"/>
                <circle cx="50" cy="50" r="8" class="visual-node"/>
                <circle cx="20" cy="80" r="6" class="visual-node" fill="#28a745"/>
                <circle cx="80" cy="20" r="6" class="visual-node" fill="#17a2b8"/>
                <circle cx="80" cy="80" r="6" class="visual-node" fill="#ffc107"/>
                <line x1="50" y1="50" x2="20" y2="80" class="visual-link"/>
                <line x1="50" y1="50" x2="80" y2="20" class="visual-link"/>
                <line x1="50" y1="50" x2="80" y2="80" class="visual-link"/>
                <text x="35" y="53" class="visual-text" fill="white">RAG</text>
            </svg>
        `,
        'scholar-2-6': `
            <svg class="visual-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="25" y="20" width="50" height="60" rx="4" fill="white" stroke="#0066cc" stroke-width="2"/>
                <line x1="35" y1="35" x2="65" y2="35" stroke="#cbd5e1" stroke-width="2"/>
                <line x1="35" y1="45" x2="65" y2="45" stroke="#cbd5e1" stroke-width="2"/>
                <line x1="35" y1="55" x2="55" y2="55" stroke="#cbd5e1" stroke-width="2"/>
                <circle cx="70" cy="70" r="12" fill="#0066cc" fill-opacity="0.9"/>
                <path d="M66 70L69 73L74 67" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `,
        'sleepcall': `
            <svg class="visual-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="30" y="30" width="40" height="40" rx="10" fill="#0066cc"/>
                <path d="M40 50L45 40L50 60L55 45L60 50" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="pulse"/>
                <circle cx="75" cy="25" r="8" fill="#dc3545" class="pulse"/>
            </svg>
        `,
        'revenue-optimization': `
            <svg class="visual-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="20" width="60" height="60" rx="2" fill="white" stroke="#e2e8f0" stroke-width="2"/>
                <rect x="30" y="50" width="10" height="20" fill="#0066cc" fill-opacity="0.5"/>
                <rect x="45" y="40" width="10" height="30" fill="#0066cc" fill-opacity="0.7"/>
                <rect x="60" y="30" width="10" height="40" fill="#0066cc"/>
                <path d="M25 70L75 70" stroke="#64748b" stroke-width="2"/>
                <path d="M35 50L50 40L65 30" stroke="#28a745" stroke-width="2" stroke-linecap="round"/>
            </svg>
        `,
        'password-research': `
            <svg class="visual-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="35" y="45" width="30" height="25" rx="2" fill="#0066cc"/>
                <path d="M35 45V35C35 27 41 27 50 27C59 27 65 27 65 35V45" stroke="#0066cc" stroke-width="4" stroke-linecap="round"/>
                <circle cx="50" cy="57" r="3" fill="white"/>
                <path d="M50 60V64" stroke="white" stroke-width="2"/>
                <text x="25" y="90" class="visual-text">SHA-256</text>
            </svg>
        `,
        'note2crm': `
            <svg class="visual-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 30H50V60H20z" fill="white" stroke="#64748b" stroke-width="2"/>
                <path d="M60 40H90V70H60z" fill="#0066cc" stroke="#0066cc" stroke-width="2"/>
                <path d="M50 45L60 55" stroke="#28a745" stroke-width="2" stroke-dasharray="4 2"/>
                <circle cx="35" cy="45" r="5" fill="#e2e8f0"/>
                <rect x="65" y="50" width="20" height="2" fill="white"/>
                <rect x="65" y="55" width="15" height="2" fill="white"/>
            </svg>
        `,
        'orderflow-ai': `
            <svg class="visual-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="30" stroke="#0066cc" stroke-width="2" stroke-dasharray="4 4" class="pulse"/>
                <rect x="35" y="35" width="30" height="30" rx="4" fill="#0066cc"/>
                <path d="M45 50L55 50M50 45L50 55" stroke="white" stroke-width="2"/>
                <circle cx="20" cy="50" r="4" fill="#28a745"/>
                <circle cx="80" cy="50" r="4" fill="#28a745"/>
            </svg>
        `,
        'safyweb': `
            <svg class="visual-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 20L80 30V50C80 70 50 85 50 85C50 85 20 70 20 50V30L50 20Z" fill="#0066cc" fill-opacity="0.1" stroke="#0066cc" stroke-width="2"/>
                <path d="M40 50L50 60L65 40" stroke="#28a745" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `,
        'artibus': `
            <svg class="visual-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="80" r="5" fill="#0066cc"/>
                <circle cx="80" cy="20" r="5" fill="#dc3545"/>
                <path d="M20 80C40 80 40 50 50 50C60 50 60 20 80 20" stroke="#64748b" stroke-width="2" stroke-dasharray="4 4"/>
                <circle cx="50" cy="50" r="8" fill="white" stroke="#0066cc" stroke-width="2"/>
                <path d="M48 50L54 50M51 47L51 53" stroke="#0066cc" stroke-width="2"/>
            </svg>
        `,
        'stock-predictor': `
            <svg class="visual-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="10" y1="90" x2="90" y2="90" stroke="#64748b" stroke-width="2"/>
                <line x1="10" y1="90" x2="10" y2="10" stroke="#64748b" stroke-width="2"/>
                <path d="M10 80L30 60L50 70L70 40L90 20" stroke="#0066cc" stroke-width="2" fill="none"/>
                <circle cx="90" cy="20" r="4" fill="#28a745" class="pulse"/>
                <rect x="28" y="58" width="4" height="22" fill="#0066cc" fill-opacity="0.2"/>
                <rect x="68" y="38" width="4" height="42" fill="#0066cc" fill-opacity="0.2"/>
            </svg>
        `,
        'ecommerce-recommendation': `
            <svg class="visual-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="30" y="40" width="40" height="30" fill="none" stroke="#0066cc" stroke-width="2"/>
                <path d="M35 40V30C35 25 40 25 50 25C60 25 65 25 65 30V40" stroke="#0066cc" stroke-width="2"/>
                <circle cx="50" cy="55" r="5" fill="#ffc107"/>
                <line x1="55" y1="55" x2="75" y2="55" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="2 2"/>
                <circle cx="80" cy="55" r="3" fill="#cbd5e1"/>
            </svg>
        `,
        'sap-successfactors': `
            <svg class="visual-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30 60C30 60 20 60 20 40C20 25 35 20 40 25C45 15 65 15 70 30C80 30 85 45 80 55" stroke="#0066cc" stroke-width="2" fill="none"/>
                <rect x="35" y="45" width="10" height="10" fill="#0066cc"/>
                <rect x="55" y="45" width="10" height="10" fill="#0066cc"/>
                <line x1="45" y1="50" x2="55" y2="50" stroke="#0066cc" stroke-width="2"/>
            </svg>
        `
    };

    return `
        <div class="visual-container">
            ${visuals[projectId] || visuals['nvidia-doc-nav']}
        </div>
    `;
}

function renderProject(project, view = 'business') {
    const isTechnical = view === 'technical';
    const isFeatured = project.featured;

    // Media logic: Use "Code-Generated Video" (Animated SVG)
    // Since external video files are not available, we use the generated visual
    // and animate it on hover/click to simulate a "Live Preview".

    let mediaHtml = `
        <div class="project-media" onclick="this.classList.toggle('playing')">
            <div class="visual-wrapper">
                ${customVisual}
            </div>
            <div class="media-badge">▶ Code Preview</div>
        </div>
    `;

    const githubLink = project.links && project.links.github
        ? `<a href="${project.links.github}" target="_blank" class="icon-link" title="View Code" onclick="trackCTAClick('github_${project.id}')"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>`
        : '';

    const demoLink = project.links && project.links.demo
        ? `<a href="${project.links.demo}" target="_blank" class="icon-link" title="Live Demo" onclick="trackCTAClick('demo_${project.id}')"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/></svg></a>`
        : '';

    return `
        <div class="project-card ${isFeatured ? 'featured' : ''}" data-project-id="${project.id}">
            ${mediaHtml}
            <div class="project-content">
                <div class="project-header">
                    <h3 class="project-title">${project.title}</h3>
                    <div class="project-links-mini">
                        ${demoLink}
                        ${githubLink}
                    </div>
                </div>
                <span class="project-role">${project.role}</span>

                <div class="project-description">
                    ${isTechnical && project.techDetails ? project.techDetails : project.solution}
                </div>

                <div class="tech-stack-mini">
                    ${project.techStack.slice(0, 4).map(tech => `<span class="tech-tag-mini">${tech}</span>`).join('')}
                    ${project.techStack.length > 4 ? `<span class="tech-tag-mini">+${project.techStack.length - 4}</span>` : ''}
                </div>
            </div>
        </div>
    `;
}

// Render stacked card for featured projects
function renderStackCard(project, iconType = 'ai') {
    const githubLink = project.links && project.links.github
        ? `<a href="${project.links.github}" target="_blank" class="stack-card-link" title="View Code"><svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>`
        : '';

    const icons = {
        ai: '',
        security: '',
        research: '',
        analytics: '',
        product: ''
    };

    return `
        <div class="stack-card" onclick="window.open('${project.links?.github || '#'}', '_blank')">
            <div class="stack-card-header">
                <div class="stack-card-icon ${iconType}">${icons[iconType] || '✨'}</div>
                <h4 class="stack-card-title">${project.title}</h4>
            </div>
            <p class="stack-card-desc">${project.solution.substring(0, 100)}...</p>
            <div class="stack-card-meta">
                <div class="stack-card-tags">
                    ${project.techStack.slice(0, 2).map(tech => `<span class="stack-card-tag">${tech}</span>`).join('')}
                </div>
                ${githubLink}
            </div>
        </div>
    `;
}

function renderAllProjects(view = 'business') {
    const container = document.getElementById('projectsContainer');
    if (!container || typeof projectsData === 'undefined') return;

    // Define the 3 hero projects by ID
    const heroProjectIds = ['leairn', 'hatrick', 'pawquest'];
    const heroProjects = heroProjectIds.map(id => projectsData.find(p => p.id === id)).filter(Boolean);

    // All other projects go in the slider
    const sliderProjects = projectsData.filter(p => !heroProjectIds.includes(p.id));

    // Icon types for hero projects
    const heroIcons = {
        'leairn': { icon: '🎓', type: 'education', color: '#4ade80' },
        'hatrick': { icon: '', type: 'security', color: '#ef4444' },
        'pawquest': { icon: '🐕', type: 'social', color: '#06b6d4' }
    };

    // Build the HTML
    let html = `
        <div class="projects-showcase">
            <!-- Hero Featured Projects - 3 Main Boxes -->
            <div class="hero-projects-grid">
                ${heroProjects.map(project => renderHeroCard(project, heroIcons[project.id], view)).join('')}
            </div>

            <!-- More Projects Carousel - One at a time -->
            <h3 class="more-projects-title" style="margin-top: 60px; text-align: center; font-size: 1.5rem; color: var(--text-primary);">More Projects</h3>
            <p style="text-align: center; color: var(--text-secondary); margin-bottom: 30px;">Browse through my GitHub projects</p>
            
            <div class="projects-carousel-container">
                <button class="carousel-nav-btn carousel-prev" id="carouselPrev" aria-label="Previous project">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                
                <div class="projects-carousel-track" id="projectsCarouselTrack">
                    ${sliderProjects.map((project, index) => renderCarouselCard(project, view, index)).join('')}
                </div>
                
                <button class="carousel-nav-btn carousel-next" id="carouselNext" aria-label="Next project">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            </div>
            
            <div class="carousel-dots" id="carouselDots">
                ${sliderProjects.map((_, i) => `<span class="carousel-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>`).join('')}
            </div>
        </div>
    `;

    container.innerHTML = html;
    container.setAttribute('data-current-view', view);

    // Initialize carousel navigation
    initProjectsCarousel(sliderProjects.length);
}

// Initialize the carousel navigation
function initProjectsCarousel(totalItems) {
    let currentIndex = 0;
    const track = document.getElementById('projectsCarouselTrack');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const dotsContainer = document.getElementById('carouselDots');

    if (!track || !prevBtn || !nextBtn) return;

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Update dots
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });

        // Update button states
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentIndex === totalItems - 1 ? '0.5' : '1';
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalItems - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Click on dots
    dotsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('carousel-dot')) {
            currentIndex = parseInt(e.target.dataset.index);
            updateCarousel();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        } else if (e.key === 'ArrowRight' && currentIndex < totalItems - 1) {
            currentIndex++;
            updateCarousel();
        }
    });
}

// Render a carousel card (single project shown at a time)
function renderCarouselCard(project, view = 'business', index) {
    const isTechnical = view === 'technical';

    const githubLink = project.links && project.links.github
        ? `<a href="${project.links.github}" target="_blank" class="carousel-card-link" title="View Code" onclick="event.stopPropagation()">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View on GitHub
           </a>`
        : '';

    const demoLink = project.links && project.links.demo
        ? `<a href="${project.links.demo}" target="_blank" class="carousel-card-link demo-link" title="Live Demo" onclick="event.stopPropagation()">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
            </svg>
            Live Demo
           </a>`
        : '';

    const projectIcons = {
        'sentinel-os': '', 'nvidia-doc-nav': '', 'scholar-2-6': '',
        'sleepcall': '🔔', 'revenue-optimization': '', 'password-research': '🔒',
        'orderflow-ai': '📦', 'openhouse': '🏠', 'emotion-detection': ''
    };
    const icon = projectIcons[project.id] || '';

    const description = isTechnical && project.techDetails
        ? project.techDetails
        : project.solution;

    return `
        <div class="carousel-card" data-index="${index}">
            <div class="carousel-card-inner">
                <div class="carousel-card-icon">${icon}</div>
                <h4 class="carousel-card-title">${project.title}</h4>
                <p class="carousel-card-role">${project.role || 'Developer'}</p>
                <p class="carousel-card-desc">${description}</p>
                <div class="carousel-card-tags">
                    ${project.techStack.slice(0, 4).map(tech => `<span class="carousel-tag">${tech}</span>`).join('')}
                </div>
                <div class="carousel-card-links">
                    ${demoLink}
                    ${githubLink}
                </div>
            </div>
        </div>
    `;
}

// Render hero featured card (LeAIrn, Hatrick, Scholar2.6)
function renderHeroCard(project, iconConfig, view = 'business') {
    const isTechnical = view === 'technical';

    const githubLink = project.links && project.links.github
        ? `<a href="${project.links.github}" target="_blank" class="hero-card-link" title="View Code" onclick="event.stopPropagation(); trackCTAClick('github_${project.id}')"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>`
        : '';

    const demoLink = project.links && project.links.demo
        ? `<a href="${project.links.demo}" target="_blank" class="hero-card-link hero-card-demo" title="Live Demo" onclick="event.stopPropagation(); trackCTAClick('demo_${project.id}')"><svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/></svg> Demo</a>`
        : '';

    const clickUrl = project.links?.demo || project.links?.github || '#';

    return `
        <div class="hero-project-card" onclick="window.open('${clickUrl}', '_blank')" style="--hero-accent: ${iconConfig?.color || '#4ade80'}">
            <div class="hero-card-icon" style="background: linear-gradient(135deg, ${iconConfig?.color || '#4ade80'}33, ${iconConfig?.color || '#4ade80'}11)">
                <span>${iconConfig?.icon || '✨'}</span>
            </div>
            <div class="hero-card-content">
                <div class="hero-card-header">
                    <h3 class="hero-card-title">${project.title}</h3>
                </div>
                <div class="hero-card-desc" style="font-size: 0.9rem; line-height: 1.5; color: var(--text-secondary);">
                     ${isTechnical ? `
                         <p style="margin-bottom: 8px;"><strong>Technical Details:</strong> ${project.techDetails || project.solution}</p>
                         <p style="margin-bottom: 8px;"><strong>Architecture:</strong> ${project.architecture || 'Full-stack application with modern frameworks and cloud deployment'}</p>
                         <p><strong>Key Technologies:</strong> ${project.techStack.slice(0, 4).join(', ')}</p>
                     ` : `
                         <p style="margin-bottom: 4px;"><strong>Problem:</strong> ${project.problem ? project.problem.substring(0, 100) + "..." : ""}</p>
                         <p style="margin-bottom: 4px;"><strong>Solution:</strong> ${project.solution.substring(0, 100)}...</p>
                         <p><strong>Impact:</strong> ${project.outcome ? project.outcome.substring(0, 100) + "..." : ""}</p>
                     `}
                </div>
                <div class="hero-card-footer">
                    <div class="hero-card-tags">
                        ${project.techStack.slice(0, 3).map(tech => `<span class="hero-card-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="hero-card-links">
                        ${demoLink}
                        ${githubLink}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Render stacked card (the overlapping card style from the image)
function renderStackedCard(project, index, view = 'business') {
    const isTechnical = view === 'technical';
    const githubLink = project.links && project.links.github
        ? `<a href="${project.links.github}" target="_blank" class="stacked-card-link" title="View Code" onclick="event.stopPropagation()"><svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>`
        : '';

    // Project type icons
    const projectIcons = {
        'nvidia-doc-nav': '',
        'sleepcall': '🔔',
        'revenue-optimization': '',
        'password-research': '🔒',
        'emotion-detection': '',
        'ai-debate': '',
        'cloud-portfolio': ''
    };

    const icon = projectIcons[project.id] || '';
    const clickUrl = project.links?.demo || project.links?.github || '#';

    const description = isTechnical && project.techDetails
        ? project.techDetails.substring(0, 80)
        : project.solution.substring(0, 80);

    return `
        <div class="stacked-card" style="--stack-index: ${index}" onclick="window.open('${clickUrl}', '_blank')">
            <div class="stacked-card-icon">${icon}</div>
            <div class="stacked-card-content">
                <h4 class="stacked-card-title">${project.title}</h4>
                <p class="stacked-card-desc">${description}...</p>
                <div class="stacked-card-footer">
                    <div class="stacked-card-tags">
                        ${project.techStack.slice(0, 2).map(tech => `<span class="stacked-card-tag">${tech}</span>`).join('')}
                    </div>
                    ${githubLink}
                </div>
            </div>
        </div>
    `;
}

// ========================================
// 21. PROJECT VIEW TOGGLE
// ========================================
function initProjectToggle() {
    const businessBtn = document.getElementById('businessViewBtn');
    const technicalBtn = document.getElementById('technicalViewBtn');

    if (!businessBtn || !technicalBtn) return;

    businessBtn.addEventListener('click', () => {
        businessBtn.classList.add('active');
        technicalBtn.classList.remove('active');
        renderAllProjects('business');
        trackCTAClick('view_toggle_business');
    });

    technicalBtn.addEventListener('click', () => {
        technicalBtn.classList.add('active');
        businessBtn.classList.remove('active');
        renderAllProjects('technical');
        trackCTAClick('view_toggle_technical');
    });
}

// Initialize projects on page load
document.addEventListener('DOMContentLoaded', () => {
    renderAllProjects('business');
    initProjectToggle();
    initIconClouds();
    initTestimonialCarousel();
    initSkillsAccordion();
});

// ========================================
// 22. INTERACTIVE ICON CLOUD (3D Rotating Sphere)
// ========================================
function initIconClouds() {
    const clouds = document.querySelectorAll('.icon-cloud');
    clouds.forEach(cloud => {
        createIconCloud(cloud);
    });
}

function createIconCloud(container) {
    const icons = container.dataset.icons ? container.dataset.icons.split(',') : [
        'typescript', 'javascript', 'react', 'python', 'nodejs',
        'html5', 'css3', 'git', 'docker', 'postgresql'
    ];

    const radius = parseInt(container.dataset.radius) || 150;
    const items = [];
    const total = icons.length;

    // Simple Icon CDN for tech logos
    const iconUrls = {
        'typescript': 'https://cdn.simpleicons.org/typescript/3178C6',
        'javascript': 'https://cdn.simpleicons.org/javascript/F7DF1E',
        'react': 'https://cdn.simpleicons.org/react/61DAFB',
        'python': 'https://cdn.simpleicons.org/python/3776AB',
        'nodejs': 'https://cdn.simpleicons.org/nodedotjs/339933',
        'html5': 'https://cdn.simpleicons.org/html5/E34F26',
        'css3': 'https://cdn.simpleicons.org/css3/1572B6',
        'git': 'https://cdn.simpleicons.org/git/F05032',
        'docker': 'https://cdn.simpleicons.org/docker/2496ED',
        'postgresql': 'https://cdn.simpleicons.org/postgresql/4169E1',
        'fastapi': 'https://cdn.simpleicons.org/fastapi/009688',
        'langchain': 'https://cdn.simpleicons.org/langchain/1C3C3C',
        'openai': 'https://cdn.simpleicons.org/openai/412991',
        'nextjs': 'https://cdn.simpleicons.org/nextdotjs/000000',
        'tailwindcss': 'https://cdn.simpleicons.org/tailwindcss/06B6D4',
        'vercel': 'https://cdn.simpleicons.org/vercel/000000',
        'github': 'https://cdn.simpleicons.org/github/181717',
        'azure': 'https://cdn.simpleicons.org/microsoftazure/0078D4',
        'aws': 'https://cdn.simpleicons.org/amazonaws/232F3E',
        'firebase': 'https://cdn.simpleicons.org/firebase/FFCA28',
        'mongodb': 'https://cdn.simpleicons.org/mongodb/47A248',
        'redis': 'https://cdn.simpleicons.org/redis/DC382D',
        'graphql': 'https://cdn.simpleicons.org/graphql/E10098',
        'figma': 'https://cdn.simpleicons.org/figma/F24E1E',
        'powerbi': 'https://cdn.simpleicons.org/powerbi/F2C811',
        'excel': 'https://cdn.simpleicons.org/microsoftexcel/217346',
        'jupyter': 'https://cdn.simpleicons.org/jupyter/F37626',
        'pandas': 'https://cdn.simpleicons.org/pandas/150458',
        'numpy': 'https://cdn.simpleicons.org/numpy/013243',
        'tensorflow': 'https://cdn.simpleicons.org/tensorflow/FF6F00',
        'pytorch': 'https://cdn.simpleicons.org/pytorch/EE4C2C',
        'scikitlearn': 'https://cdn.simpleicons.org/scikitlearn/F7931E',
        'vite': 'https://cdn.simpleicons.org/vite/646CFF',
        'webpack': 'https://cdn.simpleicons.org/webpack/8DD6F9',
        'sass': 'https://cdn.simpleicons.org/sass/CC6699',
        'framer': 'https://cdn.simpleicons.org/framer/0055FF',
        'chromeweb': 'https://cdn.simpleicons.org/googlechrome/4285F4',
        'sap': 'https://cdn.simpleicons.org/sap/0FAAFF'
    };

    // Create icon elements
    icons.forEach((icon, i) => {
        const phi = Math.acos(-1 + (2 * i) / total);
        const theta = Math.sqrt(total * Math.PI) * phi;

        const item = document.createElement('div');
        item.className = 'cloud-icon';
        item.innerHTML = `<img src="${iconUrls[icon] || iconUrls['github']}" alt="${icon}" title="${icon}">`;

        item.userData = {
            phi: phi,
            theta: theta
        };

        container.appendChild(item);
        items.push(item);
    });

    // Animation
    let angleX = 0;
    let angleY = 0;
    let autoRotateX = 0.002;
    let autoRotateY = 0.003;
    let isHovered = false;

    container.addEventListener('mouseenter', () => isHovered = true);
    container.addEventListener('mouseleave', () => isHovered = false);

    let mouseX = 0, mouseY = 0;
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        mouseX = (e.clientX - rect.left - rect.width / 2) / rect.width;
        mouseY = (e.clientY - rect.top - rect.height / 2) / rect.height;
    });

    function animate() {
        if (isHovered) {
            angleX += mouseY * 0.02;
            angleY += mouseX * 0.02;
        } else {
            angleX += autoRotateX;
            angleY += autoRotateY;
        }

        items.forEach(item => {
            const { phi, theta } = item.userData;

            // Spherical to Cartesian with rotation
            let x = radius * Math.sin(phi) * Math.cos(theta + angleY);
            let y = radius * Math.sin(phi) * Math.sin(theta + angleY);
            let z = radius * Math.cos(phi);

            // Rotate around X axis
            const cosX = Math.cos(angleX);
            const sinX = Math.sin(angleX);
            const newY = y * cosX - z * sinX;
            const newZ = y * sinX + z * cosX;
            y = newY;
            z = newZ;

            // Project to 2D with perspective
            const scale = (z + radius * 1.5) / (radius * 2);
            const opacity = Math.max(0.3, Math.min(1, scale));

            item.style.transform = `translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`;
            item.style.opacity = opacity;
            item.style.zIndex = Math.round(z + radius);
        });

        requestAnimationFrame(animate);
    }

    animate();
}

// ========================================
// 23. TESTIMONIAL CAROUSEL
// ========================================
function initTestimonialCarousel() {
    const track = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');

    if (!track || !prevBtn || !nextBtn) return;

    const cardWidth = 344; // 320px card + 24px gap

    const updateButtons = () => {
        prevBtn.disabled = track.scrollLeft <= 10;
        nextBtn.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 10;
    };

    prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });

    track.addEventListener('scroll', updateButtons);
    updateButtons();
}

// ========================================
// 24. SKILLS ACCORDION
// ========================================
function initSkillsAccordion() {
    const skillHeaders = document.querySelectorAll('.skill-header');

    skillHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const skillItem = header.closest('.skill-item');
            const isActive = skillItem.classList.contains('active');

            // Close all other items (optional: remove this block for multi-open)
            document.querySelectorAll('.skill-item.active').forEach(item => {
                if (item !== skillItem) {
                    item.classList.remove('active');
                }
            });

            // Toggle current item
            skillItem.classList.toggle('active', !isActive);
        });
    });

    // Optionally open the first item by default
    const firstItem = document.querySelector('.skill-item');
    if (firstItem) {
        firstItem.classList.add('active');
    }
}

// ========================================
// INITIALIZATION
// ========================================
// ========================================
// 25. INTERACTIVE CONTACT CARD
// ========================================

function initModernContact() {
    const canvas = document.getElementById('particleCanvas');
    const skillsOrbit = document.getElementById('skillsOrbit');

    if (!canvas || !skillsOrbit) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouseX = 0;
    let mouseY = 0;

    // Setup canvas
    function resizeCanvas() {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
        constructor() {
            this.reset();
            this.y = Math.random() * canvas.height;
            this.alpha = Math.random() * 0.5 + 0.2;
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5 - 0.1;
            this.size = Math.random() * 2 + 1;
            this.alpha = Math.random() * 0.5 + 0.2;
        }

        update() {
            // Mouse attraction
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                const force = (100 - distance) / 100;
                this.vx += (dx / distance) * force * 0.2;
                this.vy += (dy / distance) * force * 0.2;
            }

            this.x += this.vx;
            this.y += this.vy;

            // Damping
            this.vx *= 0.98;
            this.vy *= 0.98;

            // Bounds checking
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }

        draw() {
            ctx.fillStyle = `rgba(100, 150, 255, ${this.alpha})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Initialize particles
    for (let i = 0; i < 80; i++) {
        particles.push(new Particle());
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(animate);
    }

    // Mouse tracking
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    animate();

    // Skill tag cursor animation
    const skillTags = skillsOrbit.querySelectorAll('.skill-tag');
    const cursorPointer = document.getElementById('cursor-pointer');

    if (skillTags.length && cursorPointer) {
        let currentIndex = 0;
        const positions = [
            { left: '200px', top: '60px' },
            { left: '50px', top: '102px' },
            { left: '224px', top: '170px' },
            { left: '88px', top: '198px' }
        ];

        function animateCursor() {
            // Remove highlight from all tags
            skillTags.forEach(tag => tag.classList.remove('highlighted'));

            // Add highlight to current tag
            skillTags[currentIndex].classList.add('highlighted');

            // Move cursor
            cursorPointer.style.left = positions[currentIndex].left;
            cursorPointer.style.top = positions[currentIndex].top;

            // Next tag
            currentIndex = (currentIndex + 1) % skillTags.length;

            setTimeout(animateCursor, 2000);
        }

        // Start after a short delay
        setTimeout(animateCursor, 500);
    }
}

// Initialize on DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initModernContact);
} else {
    initModernContact();
}

// ========================================
// 10. VOICE READER & AVATAR LOGIC
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const readBioBtn = document.getElementById('readBioBtn');
    const voiceAvatarContainer = document.getElementById('voiceAvatarContainer');
    const avatarImg = voiceAvatarContainer?.querySelector('.voice-avatar-img');
    const bioParagraph = document.getElementById('bioParagraph');

    let isSpeaking = false;
    let speechObj = null;

    if (readBioBtn && voiceAvatarContainer && bioParagraph) {
        readBioBtn.addEventListener('click', () => {
            if (isSpeaking) {
                // Stop speaking
                window.speechSynthesis.cancel();
                stopSpeakingAnimation();
            } else {
                // Start speaking
                const text = bioParagraph.innerText || bioParagraph.textContent;
                speechObj = new SpeechSynthesisUtterance(text);

                // Pick a good English voice if available
                const voices = window.speechSynthesis.getVoices();
                const englishVoice = voices.find(v => v.lang.startsWith('en-') && (v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel')));
                if (englishVoice) speechObj.voice = englishVoice;

                speechObj.rate = 0.95; // Slightly slower for better comprehension
                speechObj.pitch = 1.0;

                speechObj.onstart = () => {
                    isSpeaking = true;
                    readBioBtn.classList.add('speaking');
                    voiceAvatarContainer.classList.remove('voice-avatar-hidden');
                    voiceAvatarContainer.classList.add('voice-avatar-visible');
                    if (avatarImg) avatarImg.classList.add('animating');
                };

                speechObj.onend = stopSpeakingAnimation;
                speechObj.onerror = stopSpeakingAnimation;

                window.speechSynthesis.speak(speechObj);
            }
        });
    }

    function stopSpeakingAnimation() {
        isSpeaking = false;
        if (readBioBtn) readBioBtn.classList.remove('speaking');
        if (voiceAvatarContainer) {
            voiceAvatarContainer.classList.remove('voice-avatar-visible');
            voiceAvatarContainer.classList.add('voice-avatar-hidden');
        }
        if (avatarImg) avatarImg.classList.remove('animating');
    }

    // Ensure speech synthesis voices are loaded (Chrome bug workaround)
    window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
    };
});

// ========================================
// 11. ROLE FIT MODAL LOGIC
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const roleFitBtn = document.getElementById('roleFitBtn');
    const roleFitModal = document.getElementById('roleFitModal');
    const closeBtn = roleFitModal?.querySelector('.role-fit-close');
    const radios = roleFitModal?.querySelectorAll('.fit-option input[type="radio"]');
    const resultContainer = document.getElementById('roleFitResultContainer');
    const messageText = document.getElementById('roleFitMessage');

    if (!roleFitBtn || !roleFitModal) return;

    // Open Modal
    roleFitBtn.addEventListener('click', () => {
        roleFitModal.classList.add('active');
    });

    // Close Modal
    const closeModal = () => roleFitModal.classList.remove('active');
    closeBtn?.addEventListener('click', closeModal);
    roleFitModal.addEventListener('click', (e) => {
        if (e.target.classList.contains('role-fit-overlay')) closeModal();
    });

    // Handle Radio Changes
    if (radios) {
        // Data mapping for custom tailored messages
        const roleMessages = {
            'genai': 'Jack brings hands-on experience building GenAI applications. He created Hatrick, an AI Agents orchestrator for multi-agent cyber defense, and Scholar 2.6. He works daily with LangChain, foundational models, and agent routing.',
            'arch': 'As a certified SAP BTP Solution Architect and AWS builder, Jack designs cloud-native, event-driven architectures and API integrations for Deloitte\'s enterprise clients.',
            'devex': 'Jack prioritizes human-centric design. He built LeAIrn (an adaptive AI education platform) and SleepCall (an audio accessibility tool), focusing heavily on Human-Computer Interaction and seamless UX.',
            'pm': 'Jack led Project Alpha at Hebrew University, co-managing software delivery from user requirements to deployed Python/C++ astrophysics simulations.',
            'comms': 'Jack\'s dual background in Psychology & Computer Science allows him to translate complex business needs into technical architecture—he speaks both "Business" and "Code".'
        };

        radios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                const selectedVal = e.target.value;
                if (roleMessages[selectedVal]) {
                    resultContainer.style.display = 'block';
                    messageText.innerHTML = `<strong>Jack has demonstrated this:</strong> ${roleMessages[selectedVal]}`;
                    confettiEffect();
                }
            });
        });
    }

    // Simple Confetti Effect using Canvas
    function confettiEffect() {
        // Only run once per session to avoid annoyance
        if (window.confettiFired) return;
        window.confettiFired = true;

        const duration = 3000;
        const end = Date.now() + duration;

        (function frame() {
            // Simplified logic: Create a few falling colored divs on the screen
            const colors = ['#0066cc', '#10b981', '#ffcc00', '#ff6b6b'];
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.zIndex = '10002';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.pointerEvents = 'none';
            document.body.appendChild(confetti);

            const animation = confetti.animate([
                { transform: `translate3d(0, 0, 0) rotate(0deg)`, opacity: 1 },
                { transform: `translate3d(${Math.random() * 100 - 50}px, 100vh, 0) rotate(${Math.random() * 720}deg)`, opacity: 0 }
            ], {
                duration: Math.random() * 1000 + 1000,
                easing: 'linear'
            });

            animation.onfinish = () => confetti.remove();

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }
});

// ========================================
// 12. VIDEO PITCH MODAL LOGIC
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const openPitchBtn = document.getElementById('openPitchBtn');
    const videoModal = document.getElementById('videoModal');
    const closeBtn = videoModal?.querySelector('.video-modal-close');
    const videoElement = document.getElementById('pitchVideo');
    let hasAutoTriggered = false;

    if (!videoModal || !videoElement) return;

    // Function to open modal & play video
    const openVideoModal = () => {
        videoModal.classList.add('active');
        // Prevent scrolling on body
        document.body.style.overflow = 'hidden';
        videoElement.play().catch(e => console.log('Auto-play prevented:', e));
    };

    // Function to close modal & pause video
    const closeVideoModal = () => {
        videoModal.classList.remove('active');
        document.body.style.overflow = '';
        videoElement.pause();
    };

    // Manual Trigger
    if (openPitchBtn) {
        openPitchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            hasAutoTriggered = true; // prevent auto-trigger if they already clicked it
            openVideoModal();
        });
    }

    // Auto Trigger after 15 seconds
    setTimeout(() => {
        const tourModal = document.getElementById('tour-modal');
        const roleFitModal = document.getElementById('roleFitModal');
        const isAnotherModalOpen =
            (tourModal && tourModal.classList.contains('active')) ||
            (roleFitModal && roleFitModal.classList.contains('active'));

        // Only auto-trigger if no other modals are open and user hasn't already clicked it
        if (!hasAutoTriggered && !isAnotherModalOpen) {
            hasAutoTriggered = true;
            openVideoModal();
        }
    }, 15000);

    // Event Listeners for closing
    closeBtn?.addEventListener('click', closeVideoModal);
    videoModal.addEventListener('click', (e) => {
        if (e.target.classList.contains('video-modal-overlay')) closeVideoModal();
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeVideoModal();
        }
    });
});

// ========================================
// 13. FAQ ACCORDION LOGIC
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');

        questionBtn.addEventListener('click', () => {
            // Check if this item is currently active
            const isActive = item.classList.contains('active');

            // Close all items first (for accordion style)
            // Optional: Remove this loop if you want multiple items open at once
            faqItems.forEach(faq => faq.classList.remove('active'));

            // If it wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});

// ========================================
// INITIALIZATION
// ========================================
console.log(' Portfolio loaded successfully!');
console.log('💡 Keyboard shortcuts:');
console.log('   Ctrl/Cmd + D: Toggle dark mode');
console.log('   Escape: Close mobile menu');
