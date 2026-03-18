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

// Navbar Scroll Effect
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
    const heroGrid = document.getElementById('heroProjectsGrid');
    if (typeof projectsData === 'undefined') return;

    // Define the 3 hero projects by ID
    const heroProjectIds = ['hatrick', 'learn-machine-learn', 'pawquest'];
    const heroProjects = heroProjectIds.map(id => projectsData.find(p => p.id === id)).filter(Boolean);

    // All other projects go in the slider
    const sliderProjects = projectsData.filter(p => !heroProjectIds.includes(p.id));

    // Icon types for hero projects
    const heroIcons = {
        'leairn': { icon: '🎓', type: 'education', color: '#4ade80' },
        'hatrick': { icon: '🛡️', type: 'security', color: '#ef4444' },
        'pawquest': { icon: '🐕', type: 'social', color: '#06b6d4' },
        'learn-machine-learn': { icon: '🧠', type: 'education', color: '#fdd835' }
    };

    // Render Hero Grid (3 squares)
    if (heroGrid) {
        heroGrid.innerHTML = heroProjects.map(project => renderHeroCard(project, heroIcons[project.id], view)).join('');
    }

    // Render Slider Projects
    if (container) {
        let html = `
            <div class="projects-showcase">
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
        initProjectsCarousel(sliderProjects.length);
    }
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
        : `<span class="carousel-card-link" style="color: var(--text-secondary); font-size: 0.85rem; font-style: italic; cursor: default;">Private project: would be shown upon request</span>`;

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
    const demoUrl = project.links?.demo;
    const mediaUrl = project.image || project.mediaUrl;
    
    // Determine the background image
    const backgroundImage = project.image || 'images/hero-bg-1.jpg'; // Fallback image

    return `
        <div class="hero-project-card">
            <div class="hero-card-icon-container">
                <img src="${backgroundImage}" alt="${project.title}" class="hero-card-project-img">
                <div class="hero-card-overlay"></div>
            </div>
            <div class="hero-project-card-content">
                <h3 class="hero-card-title">${project.title}</h3>
                <div class="hero-card-actions">
                    <button class="btn-card-action btn-view-more" onclick="event.stopPropagation(); openProjectModal('${project.id}')">
                        <i class="fab fa-youtube"></i> Video
                    </button>
                    ${demoUrl ? `
                    <button class="btn-card-action btn-live-preview" onclick="event.stopPropagation(); openLivePreview('${demoUrl}')">
                        <i class="fas fa-external-link-alt"></i> Live Site
                    </button>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

// Function to open project modal with PSI and Video
function openProjectModal(projectId) {
    if (typeof projectsData === 'undefined') return;
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;

    const modal = document.getElementById('projectModal');
    const video = document.getElementById('projectModalVideo');
    const title = document.getElementById('modalTitle');
    const role = document.getElementById('modalRole');
    const problem = document.getElementById('modalProblem');
    const solution = document.getElementById('modalSolution');
    const impact = document.getElementById('modalImpact');
    const links = document.getElementById('modalLinks');

    if (!modal || !video) {
        console.error('Modal or video element not found');
        return;
    }

    // Populate data
    title.textContent = project.title;
    role.textContent = project.role || 'Lead Developer';
    problem.innerHTML = project.problem || 'N/A';
    solution.innerHTML = project.solution || 'N/A';
    impact.innerHTML = project.outcome || project.metrics?.join(', ') || 'N/A';

    // Video handling - using mediaUrl or video field
    const videoSrc = project.video || project.mediaUrl;
    if (project.mediaType === 'video' || (videoSrc && videoSrc.endsWith('.mp4'))) {
        video.src = videoSrc;
        video.style.display = 'block';
        video.parentElement.style.display = 'flex';
        video.play().catch(e => console.log('Auto-play prevented:', e));
    } else {
        video.style.display = 'none';
        video.parentElement.style.display = 'none'; // Maybe show image instead?
    }

    // Links handling
    links.innerHTML = '';
    if (project.links?.demo) {
        links.innerHTML += `<a href="${project.links.demo}" target="_blank" class="cta-button primary" style="padding: 10px 20px; font-size: 0.9rem; text-decoration: none; display: flex; align-items: center; justify-content: center;">Live Demo</a>`;
    }
    if (project.links?.github) {
        links.innerHTML += `<a href="${project.links.github}" target="_blank" class="cta-button secondary" style="padding: 10px 20px; font-size: 0.9rem; text-decoration: none; display: flex; align-items: center; justify-content: center;">GitHub</a>`;
    }

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Function to open live preview in iframe
function openLivePreview(url) {
    if (!url) return;
    const modal = document.getElementById('livePreviewModal');
    const iframe = document.getElementById('livePreviewIframe');
    const loader = document.getElementById('livePreviewLoader');

    if (!modal || !iframe) return;

    if (loader) loader.style.display = 'flex';
    iframe.src = url;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    iframe.onload = () => {
        if (loader) loader.style.display = 'none';
    };
}

// Function to close live preview
function closeLivePreview() {
    const modal = document.getElementById('livePreviewModal');
    const iframe = document.getElementById('livePreviewIframe');
    if (!modal || !iframe) return;

    modal.classList.remove('active');
    iframe.src = ''; // Clear source to stop media/scripts
    document.body.style.overflow = '';
}

// Initialize Project Modal Logic
document.addEventListener('DOMContentLoaded', () => {
    const projectModal = document.getElementById('projectModal');
    const closeBtn = document.getElementById('closeProjectModal');
    const overlay = projectModal?.querySelector('.project-modal-overlay');

    if (!projectModal) return;

    const closeModal = () => {
        projectModal.classList.remove('active');
        document.body.style.overflow = '';
        const video = document.getElementById('projectModalVideo');
        if (video) {
            video.pause();
            video.src = '';
        }
    };

    closeBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        closeModal();
    });

    overlay?.addEventListener('click', (e) => {
        e.stopPropagation();
        closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal.classList.contains('active')) {
            closeModal();
        }
    });
});

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
        'css3': 'https://cdn.simpleicons.org/css/1572B6',
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
        'azure': "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230078D4'%3E%3Cpath d='M13.05 4.24L6.56 18.05a.5.5 0 0 1-.47.31L0 18.36l4.58-8.41L7.52 4.24h5.53zm.56 1.98l3.55 8.52-6.77 4.17a.5.5 0 0 0-.05.01L17.75 18.92l-4.14-12.7zm2.46-.15H24l-7.93 13.31h-7.35l7.35-13.31z'/%3E%3C/svg%3E",
        'aws': "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23FF9900'%3E%3Cpath d='M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.032-.863.104-.296.072-.583.16-.863.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.024c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.28-.144.616-.264 1.01-.36a4.84 4.84 0 0 1 1.244-.152c.95 0 1.644.216 2.091.647.44.43.662 1.085.662 1.963v2.586zM3.26 12.24c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.096.655.295.846.191.2.47.296.838.296zm6.836.12c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.4c0-.159.08-.247.24-.247h.782c.151 0 .255.024.311.08.064.048.112.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.024.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.16 0 .248.08.248.247 0 .048-.008.104-.024.168a1.488 1.488 0 0 1-.056.232l-2.07 6.42c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.319-.08-.063-.056-.12-.16-.151-.32L12.13 6.97l-1.244 5.17c-.04.16-.088.264-.152.32-.064.055-.175.079-.32.079h-.686zm10.74.3a4.59 4.59 0 0 1-1.062-.12c-.35-.088-.622-.184-.806-.295a.5.5 0 0 1-.216-.232.56.56 0 0 1-.032-.2v-.407c0-.167.064-.247.183-.247a.455.455 0 0 1 .144.024c.048.016.12.048.2.08.27.12.566.216.886.28.328.064.647.096.975.096.502 0 .894-.088 1.166-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.415-.287-.806-.415l-1.157-.36c-.583-.183-1.014-.455-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.176 0 .36.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.486.486 0 0 1 .071.28v.375c0 .168-.063.256-.183.256a.826.826 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.072-1.062.223a.752.752 0 0 0-.375.671c0 .224.08.416.248.567.167.152.479.304.926.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.335.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167zM21.698 16.207c-2.626 1.94-6.442 2.969-9.722 2.969-4.598 0-8.74-1.7-11.87-4.526-.247-.224-.024-.527.272-.351 3.384 1.963 7.559 3.153 11.877 3.153 2.914 0 6.114-.607 9.06-1.852.439-.2.814.287.383.607zM22.792 14.961c-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.399.287.36-.08 2.826-1.485 4.007-.216.184-.423.088-.327-.151.32-.79 1.03-2.57.695-2.994z'/%3E%3C/svg%3E",
        'firebase': 'https://cdn.simpleicons.org/firebase/FFCA28',
        'mongodb': 'https://cdn.simpleicons.org/mongodb/47A248',
        'redis': 'https://cdn.simpleicons.org/redis/DC382D',
        'graphql': 'https://cdn.simpleicons.org/graphql/E10098',
        'figma': 'https://cdn.simpleicons.org/figma/F24E1E',
        'powerbi': "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23F2C811'%3E%3Cpath d='M10 2v20H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h6zm2 0h4v20h-4V2zm6 4h4v12h-4V6z'/%3E%3C/svg%3E",
        'excel': "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23217346'%3E%3Cpath d='M14.222 2H6.667A2.667 2.667 0 0 0 4 4.667v14.666A2.667 2.667 0 0 0 6.667 22h10.666A2.667 2.667 0 0 0 20 19.333V7.778L14.222 2zM16 17h-2.5l-1.5-2.5L10.5 17H8l2.5-4L8 9h2.5l1.5 2.5L13.5 9H16l-2.5 4L16 17z'/%3E%3C/svg%3E",
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
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');

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
            console.log('Accordion header clicked:', header.innerText, 'Parent classes:', skillItem.className);
            const isActive = skillItem.classList.contains('active');

            // Close all other items
            document.querySelectorAll('.skill-item.active').forEach(item => {
                if (item !== skillItem) {
                    item.classList.remove('active');
                }
            });

            // Toggle current item
            skillItem.classList.toggle('active', !isActive);
            console.log('New active state:', skillItem.classList.contains('active'));
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

    let isSpeaking = false;
    const audioIntro = new Audio('audio intro.opus');

    if (readBioBtn && voiceAvatarContainer) {
        readBioBtn.addEventListener('click', () => {
            if (isSpeaking) {
                // Stop playing
                audioIntro.pause();
                audioIntro.currentTime = 0;
                stopSpeakingAnimation();
            } else {
                // Start playing
                audioIntro.play().then(() => {
                    isSpeaking = true;
                    readBioBtn.classList.add('speaking');
                    voiceAvatarContainer.classList.remove('voice-avatar-hidden');
                    voiceAvatarContainer.classList.add('voice-avatar-visible');
                    if (avatarImg) avatarImg.classList.add('animating');
                    trackCTAClick('audio_intro_played');
                }).catch(err => {
                    console.error('Audio playback failed:', err);
                    stopSpeakingAnimation();
                });
            }
        });

        audioIntro.addEventListener('ended', stopSpeakingAnimation);
        audioIntro.addEventListener('error', stopSpeakingAnimation);
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
});

// ========================================
// 10b. MY STORY VOICE READER LOGIC
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const readStoryBtn = document.getElementById('readStoryBtn');
    const storyAvatarContainer = document.getElementById('storyVoiceAvatarContainer');
    const storyAvatarImg = storyAvatarContainer?.querySelector('.voice-avatar-img');

    let isStoryPlaying = false;
    const storyAudio = new Audio('My story Audio.opus');

    if (readStoryBtn && storyAvatarContainer) {
        readStoryBtn.addEventListener('click', () => {
            if (isStoryPlaying) {
                storyAudio.pause();
                storyAudio.currentTime = 0;
                stopStoryAnimation();
            } else {
                storyAudio.play().then(() => {
                    isStoryPlaying = true;
                    readStoryBtn.classList.add('speaking');
                    storyAvatarContainer.classList.remove('voice-avatar-hidden');
                    storyAvatarContainer.classList.add('voice-avatar-visible');
                    if (storyAvatarImg) storyAvatarImg.classList.add('animating');
                    trackCTAClick('story_audio_played');
                }).catch(err => {
                    console.error('Story audio playback failed:', err);
                    stopStoryAnimation();
                });
            }
        });

        storyAudio.addEventListener('ended', stopStoryAnimation);
        storyAudio.addEventListener('error', stopStoryAnimation);
    }

    function stopStoryAnimation() {
        isStoryPlaying = false;
        if (readStoryBtn) readStoryBtn.classList.remove('speaking');
        if (storyAvatarContainer) {
            storyAvatarContainer.classList.remove('voice-avatar-visible');
            storyAvatarContainer.classList.add('voice-avatar-hidden');
        }
        if (storyAvatarImg) storyAvatarImg.classList.remove('animating');
    }
});

// ========================================
// 10c. MAGIC HAPPENS VOICE READER LOGIC
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const readMagicBtn = document.getElementById('readMagicBtn');
    const magicAvatarContainer = document.getElementById('magicVoiceAvatarContainer');
    const magicAvatarImg = magicAvatarContainer?.querySelector('.voice-avatar-img');

    let isMagicPlaying = false;
    const magicAudio = new Audio('magic happens audio.opus');

    if (readMagicBtn && magicAvatarContainer) {
        readMagicBtn.addEventListener('click', () => {
            if (isMagicPlaying) {
                magicAudio.pause();
                magicAudio.currentTime = 0;
                stopMagicAnimation();
            } else {
                magicAudio.play().then(() => {
                    isMagicPlaying = true;
                    readMagicBtn.classList.add('speaking');
                    magicAvatarContainer.classList.remove('voice-avatar-hidden');
                    magicAvatarContainer.classList.add('voice-avatar-visible');
                    if (magicAvatarImg) magicAvatarImg.classList.add('animating');
                    trackCTAClick('magic_audio_played');
                }).catch(err => {
                    console.error('Magic audio playback failed:', err);
                    stopMagicAnimation();
                });
            }
        });

        magicAudio.addEventListener('ended', stopMagicAnimation);
        magicAudio.addEventListener('error', stopMagicAnimation);
    }

    function stopMagicAnimation() {
        isMagicPlaying = false;
        if (readMagicBtn) readMagicBtn.classList.remove('speaking');
        if (magicAvatarContainer) {
            magicAvatarContainer.classList.remove('voice-avatar-visible');
            magicAvatarContainer.classList.add('voice-avatar-hidden');
        }
        if (magicAvatarImg) magicAvatarImg.classList.remove('animating');
    }
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
// INITIALIZATION
// ========================================
console.log(' Portfolio loaded successfully!');
console.log('💡 Keyboard shortcuts:');
console.log('   Ctrl/Cmd + D: Toggle dark mode');
console.log('   Escape: Close mobile menu');

// ========================================
// 21. STAY CONNECTED POPUP LOGIC
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const scModal = document.getElementById('stayConnectedModal');
    const scOverlay = document.getElementById('stayConnectedOverlay');
    const scCloseBtn = document.getElementById('closeStayConnected');
    const scForm = document.getElementById('stayConnectedForm');
    const scSuccessMessage = document.getElementById('scSuccessMessage');

    if (!scModal) return;

    let hasShownPopup = sessionStorage.getItem('hasShownStayConnected');

    const openStayConnectedModal = () => {
        if (!hasShownPopup && !document.querySelector('.role-fit-modal.active:not(#stayConnectedModal)')) {
            scModal.classList.add('active');
            sessionStorage.setItem('hasShownStayConnected', 'true');
            hasShownPopup = true;
            document.body.style.overflow = 'hidden'; // Prevent scrolling
            trackCTAClick('stay_connected_popup_shown');
        }
    };

    const closeStayConnectedModal = () => {
        scModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    // 1. Timer Trigger - 60 seconds
    const stayConnectedTimer = setTimeout(() => {
        openStayConnectedModal();
    }, 60000); // 60 seconds

    // 2. Scroll Trigger - Bottom of page
    const scrollTrigger = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        // Trigger when 95% down the page
        if ((scrollTop / docHeight) > 0.95 && !hasShownPopup) {
            openStayConnectedModal();
            window.removeEventListener('scroll', scrollTrigger); // Remove after triggering once
        }
    };
    window.addEventListener('scroll', scrollTrigger);

    // Close logic
    scCloseBtn?.addEventListener('click', closeStayConnectedModal);
    scOverlay?.addEventListener('click', closeStayConnectedModal);

    // Form Submission (Using Formspree to send to Jackamichai@gmail.com)
    if (scForm) {
        scForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('scName').value;
            const email = document.getElementById('scEmail').value;
            const company = document.getElementById('scCompany').value;
            const submitBtn = scForm.querySelector('button[type="submit"]');

            submitBtn.innerHTML = 'Sending...';
            submitBtn.disabled = true;

            try {
                const response = await fetch('https://formsubmit.co/ajax/jackamichai@gmail.com', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        company: company || 'Not specified',
                        _subject: `New Connection Request from ${name} via Portfolio!`,
                        _replyto: email,
                        _template: 'table'
                    })
                });

                if (response.ok) {
                    scSuccessMessage.style.display = 'block';
                    setTimeout(closeStayConnectedModal, 3000);
                    trackCTAClick('stay_connected_form_submitted');
                } else {
                    showToast('⚠ Failed to send. Please try again or email directly.');
                    submitBtn.innerHTML = 'Send Details';
                    submitBtn.disabled = false;
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                showToast('⚠ Network error. Please try again.');
                submitBtn.innerHTML = 'Send Details';
                submitBtn.disabled = false;
            }
        });
    }
});

// AI PLAYGROUND LOGIC REMOVED

// ========================================
// AI RESUME TAILORING LOGIC
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const companyInput = document.getElementById('companyNameInput');
    const generateBtn = document.getElementById('generatePitchBtn');
    const pitchOutputArea = document.getElementById('pitchOutputArea');
    const pitchContent = document.getElementById('pitchContent');
    const pitchLoading = document.getElementById('pitchLoading');
    const copyPitchBtn = document.getElementById('copyPitchBtn');

    if (!companyInput || !generateBtn) return;

    generateBtn.addEventListener('click', async () => {
        const company = companyInput.value.trim();
        if (!company) {
            showToast('⚠ Please enter a company name');
            companyInput.focus();
            return;
        }

        // Check localStorage cache first (24h TTL)
        const cacheKey = `pitch_cache_${company.toLowerCase()}`;
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
            try {
                const { pitch, timestamp } = JSON.parse(cached);
                const age = Date.now() - timestamp;
                if (age < 24 * 60 * 60 * 1000) { // 24 hours
                    pitchLoading.style.display = 'none';
                    pitchOutputArea.style.display = 'block';
                    pitchContent.innerHTML = formatPitchMarkdown(pitch) + '<p style="font-size:0.75rem;color:var(--text-secondary);opacity:0.6;margin-top:12px;">⚡ Loaded from cache • <a href="#" onclick="localStorage.removeItem(\'' + cacheKey + '\');location.reload();return false;" style="color:var(--accent);">Regenerate</a></p>';
                    showToast('⚡ Loaded cached pitch — click Regenerate for a fresh one');
                    trackAIAnalytics('pitch', 'cache_hit');
                    if (typeof trackCTAClick !== 'undefined') trackCTAClick('pitch_cached_' + company);
                    return;
                }
            } catch (e) { localStorage.removeItem(cacheKey); }
        }

        // Show loading, hide output
        pitchLoading.style.display = 'flex';
        pitchOutputArea.style.display = 'none';
        generateBtn.disabled = true;
        generateBtn.innerHTML = '<div class="pitch-loading-spinner" style="width:18px;height:18px;border-width:2px;"></div> Generating...';

        try {
            const response = await fetch('/api/cover-letter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ companyName: company })
            });

            // Handle rate limiting
            if (response.status === 429) {
                const data = await response.json();
                pitchLoading.style.display = 'none';
                pitchOutputArea.style.display = 'block';
                pitchContent.innerHTML = `<p style="color: #f59e0b;">⏳ Rate limit reached. Please wait ${data.retryAfter || 60} seconds before generating another pitch.</p>`;
                showRateLimitToast(data.retryAfter || 60);
                trackAIAnalytics('pitch', 'rate_limited');
                return;
            }

            if (!response.ok) throw new Error('API failed');

            const data = await response.json();
            const pitch = data.choices[0].message.content;

            // Cache the result
            try {
                localStorage.setItem(cacheKey, JSON.stringify({ pitch, timestamp: Date.now() }));
            } catch (e) { /* quota exceeded, ignore */ }

            // Show output
            pitchLoading.style.display = 'none';
            pitchOutputArea.style.display = 'block';
            pitchContent.innerHTML = formatPitchMarkdown(pitch);

            trackAIAnalytics('pitch', 'success');
            if (typeof trackCTAClick !== 'undefined') trackCTAClick('pitch_generated_' + company);
        } catch (err) {
            console.error('Pitch generation error:', err);
            pitchLoading.style.display = 'none';
            pitchOutputArea.style.display = 'block';
            pitchContent.innerHTML = '<p style="color: #ef4444;">⚠ Couldn\'t generate the pitch. This feature works on the live deployed site (Vercel) with the NVIDIA API key configured.</p>';
            trackAIAnalytics('pitch', 'error');
        } finally {
            generateBtn.disabled = false;
            generateBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path></svg> Generate Pitch`;
        }
    });

    // Enter key support
    companyInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') generateBtn.click();
    });

    // Copy to clipboard
    if (copyPitchBtn) {
        copyPitchBtn.addEventListener('click', () => {
            const text = pitchContent.innerText;
            navigator.clipboard.writeText(text).then(() => {
                showToast('📋 Pitch copied to clipboard!');
                copyPitchBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!';
                setTimeout(() => {
                    copyPitchBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy';
                }, 2000);
            });
        });
    }

    function formatPitchMarkdown(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/^- (.*$)/gm, '<li>$1</li>')
            .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br>')
            .replace(/^/, '<p>')
            .replace(/$/, '</p>');
    }
});

// ========================================
// SHARED: Rate Limit Toast & AI Analytics
// ========================================
function showRateLimitToast(retryAfter) {
    // Remove existing toast if any
    document.querySelector('.rate-limit-toast')?.remove();

    const seconds = parseInt(retryAfter);
    const toast = document.createElement('div');
    toast.className = 'rate-limit-toast';
    toast.innerHTML = `
        <div class="rate-limit-icon">⏱️</div>
        <div class="rate-limit-text">
            <strong>Rate limit reached</strong>
            <span class="rate-limit-countdown">Try again in <b>${seconds}s</b></span>
        </div>
        <div class="rate-limit-bar"><div class="rate-limit-bar-fill"></div></div>
    `;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('visible'));

    // Animate the progress bar
    const barFill = toast.querySelector('.rate-limit-bar-fill');
    barFill.style.transition = `width ${seconds}s linear`;
    requestAnimationFrame(() => { barFill.style.width = '0%'; });

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

function trackAIAnalytics(feature, status) {
    try {
        const key = 'ai_usage_analytics';
        const analytics = JSON.parse(localStorage.getItem(key) || '[]');
        analytics.push({ feature, status, timestamp: new Date().toISOString() });
        if (analytics.length > 100) analytics.splice(0, analytics.length - 100);
        localStorage.setItem(key, JSON.stringify(analytics));
    } catch (e) { /* silent */ }
}
