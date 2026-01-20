
/**
 * Sparkles Text Effect
 * Ported from React SparklesText to Vanilla JS
 */

class SparklesText {
    constructor(element) {
        this.element = element;
        this.text = element.innerText; // Keep original text
        this.colors = {
            first: element.dataset.colorFirst || '#9E7AFF',
            second: element.dataset.colorSecond || '#FE8BBB'
        };
        this.count = parseInt(element.dataset.sparklesCount) || 10;

        this.init();
    }

    init() {
        // Wrap text in a relative container
        this.element.style.position = 'relative';
        this.element.style.display = 'inline-block';

        // Ensure text is robust
        const textSpan = document.createElement('span');
        textSpan.style.position = 'relative';
        textSpan.style.zIndex = '1';
        textSpan.innerHTML = this.element.innerHTML;

        this.element.innerHTML = '';
        this.element.appendChild(textSpan);

        // Generate sparkles
        for (let i = 0; i < this.count; i++) {
            this.createSparkle();
        }

        // Continuous generation loop (replacing dying stars)
        // In the React code it replaces them when lifespan ends. 
        // Here we can just use CSS animation loops with random delays.
    }

    createSparkle() {
        const star = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

        // Config
        const color = Math.random() > 0.5 ? this.colors.first : this.colors.second;
        const delay = Math.random() * 2;
        const scale = Math.random() * 1 + 0.3;
        const duration = 1.5; // Roughly match visual feel

        // SVG Props
        star.setAttribute('width', '21');
        star.setAttribute('height', '21');
        star.setAttribute('viewBox', '0 0 21 21');
        star.style.position = 'absolute';
        star.style.pointerEvents = 'none';
        star.style.zIndex = '2';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;

        // Animation
        star.style.animation = `sparkle-anim ${duration}s infinite linear`;
        star.style.animationDelay = `${delay}s`;
        // Apply random scale via variable or transform
        star.style.transformOrigin = 'center';

        // Path Data
        path.setAttribute('d', "M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.5 7.5C14.6084 8.60843 16.8077 8.59935 18.2797 9.13822L20.1561 9.82534C20.7858 10.0553 20.7858 10.9447 20.1561 11.1747L18.2797 11.8618C16.8077 12.4007 14.6084 12.3916 13.5 13.5C12.3916 14.6084 12.4006 16.8077 11.8618 18.2798L11.1746 20.1562C10.9446 20.7858 10.0553 20.7858 9.82531 20.1562L9.13819 18.2798C8.59932 16.8077 8.60843 14.6084 7.5 13.5C6.39157 12.3916 4.19225 12.4007 2.72023 11.8618L0.843814 11.1747C0.215148 10.9447 0.215148 10.0553 0.843814 9.82534L2.72023 9.13822C4.19225 8.59935 6.39157 8.60843 7.5 7.5C8.60843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z");
        path.setAttribute('fill', color);

        // Pass scale to animation via CSS var if we want dynamic scaling per star during animation, 
        // or just hardcode the keyframes to scale from 0 to 1 to 0.
        // We can just use the transform in keyframes.

        star.appendChild(path);
        this.element.appendChild(star);
    }
}

window.initSparkles = () => {
    document.querySelectorAll('.sparkles-text').forEach(el => new SparklesText(el));
};

window.addEventListener('load', window.initSparkles);
