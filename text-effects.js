
/**
 * Text Effects Utils
 * Handles Fade In and Stagger animations
 */

class TextReveal {
    constructor(element) {
        this.element = element;
        this.type = element.dataset.effect || 'word'; // word, char, line
        this.delay = parseFloat(element.dataset.delay) || 0;

        this.init();
    }

    init() {
        // Initial state
        this.element.style.opacity = '0';
        this.element.style.transform = 'translateY(20px)';
        this.element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

        // Check if we should split text (only if no nested HTML to be safe, or just specific types)
        // For the blockquote with <strong>, we want to preserve HTML, so we use 'line' or block mode.
        // If type is 'word' or 'char', we attempt split (WARNING: strips HTML tags like <strong>)

        // If the element has children elements (tags), fallback to block fade unless explicitly handled
        const hasTags = this.element.children.length > 0;

        if (!hasTags && (this.type === 'word' || this.type === 'char')) {
            const text = this.element.innerText;
            this.element.innerHTML = '';
            this.element.style.opacity = '1'; // Container visible, children hidden
            this.element.style.transform = 'none'; // reset container transform for split mode
            this.element.style.transition = 'none';

            if (this.type === 'word') {
                // Split by space but capture the space
                const segments = text.split(/(\s+)/);
                segments.forEach(segment => {
                    const span = document.createElement('span');
                    span.innerText = segment;
                    span.style.opacity = '0';
                    span.style.display = 'inline-block';
                    // Critical fix for spacing:
                    span.style.whiteSpace = 'pre';

                    span.style.transform = 'translateY(10px)';
                    span.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    span.classList.add('reveal-item');
                    this.element.appendChild(span);
                });
            } else if (this.type === 'char') {
                const chars = text.split('');
                chars.forEach(char => {
                    const span = document.createElement('span');
                    span.innerText = char;
                    span.style.opacity = '0';
                    span.style.display = 'inline-block';
                    span.style.whiteSpace = 'pre'; // Fix for char spacing

                    span.style.transform = 'translateY(10px)';
                    span.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    span.classList.add('reveal-item');
                    this.element.appendChild(span);
                });
            }
        }
        // If 'line' or has HTML tags, we leave innerHTML alone and just fade the container (already set above)

        this.observe();
    }

    observe() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animate();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(this.element);
    }

    animate() {
        const items = this.element.querySelectorAll('.reveal-item');
        if (items.length > 0) {
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, this.delay * 1000 + (index * 30)); // Faster stagger
            });
        } else {
            // Block fade
            setTimeout(() => {
                this.element.style.opacity = '1';
                this.element.style.transform = 'translateY(0)';
            }, this.delay * 1000);
        }
    }
}

// Init function
window.initTextEffects = () => {
    const elements = document.querySelectorAll('.text-reveal');
    elements.forEach(el => new TextReveal(el));
};

window.addEventListener('load', window.initTextEffects);

// Book List Toggle
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggle-books-btn');
    const booksContainer = document.getElementById('books-list-container');
    
    if (toggleBtn && booksContainer) {
        toggleBtn.addEventListener('click', () => {
            const isVisible = booksContainer.classList.contains('visible');
            
            if (isVisible) {
                booksContainer.classList.remove('visible');
                setTimeout(() => {
                    booksContainer.style.display = 'none';
                }, 500); 
                toggleBtn.textContent = "See Jack's Recommended List";
            } else {
                booksContainer.style.display = 'block';
                // Small delay to allow display:block to render
                requestAnimationFrame(() => {
                    booksContainer.classList.add('visible');
                });
                toggleBtn.textContent = "Hide List";
            }
        });
    }
});
