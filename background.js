(function() {
    'use strict';

    let container = null;
    let canvas = null;
    let ctx = null;
    let nodes = [];
    let animationFrameId = null;
    let isDark = false;
    let isVisible = true;
    let mediaQuery = null;

    const PALETTE = ['#dbeafe', '#e0e7ff', '#f0fdf4', '#fff7ed', '#fdf4ff'];
    const NUM_NODES = 55;
    const MAX_DISTANCE = 110;

    // Node class for dark mode
    class Node {
        constructor(w, h) {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.vx = (Math.random() - 0.5) * 0.8; // ±0.4px/frame
            this.vy = (Math.random() - 0.5) * 0.8;
            this.radius = 1 + Math.random() * 2.5; // 1-3.5px
            this.color = Math.random() > 0.5 ? '#38bdf8' : '#818cf8';
        }

        update(w, h) {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > w) this.vx *= -1;
            if (this.y < 0 || this.y > h) this.vy *= -1;
        }

        draw(ctx) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    function initLightMode() {
        const grid = document.createElement('div');
        grid.className = 'bg-glass-grid';
        
        for (let i = 0; i < 40; i++) { // 8 * 5 = 40
            const cell = document.createElement('div');
            cell.className = 'glass-cell';
            
            // Randomly assign ~18% a soft colored tint
            if (Math.random() < 0.18) {
                const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
                cell.style.backgroundColor = color;
                cell.style.opacity = '0.5';
            }
            grid.appendChild(cell);
        }

        const texture = document.createElement('div');
        texture.className = 'bg-texture';

        container.appendChild(grid);
        container.appendChild(texture);
    }

    function initDarkMode() {
        canvas = document.createElement('canvas');
        ctx = canvas.getContext('2d');
        container.appendChild(canvas);
        
        resizeCanvas();
        initNodes();
        
        if (isDark && isVisible) {
            startAnimation();
        }
    }

    function resizeCanvas() {
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initNodes(); // re-initialize to avoid empty areas
    }

    function initNodes() {
        if (!canvas) return;
        nodes = [];
        for (let i = 0; i < NUM_NODES; i++) {
            nodes.push(new Node(canvas.width, canvas.height));
        }
    }

    function drawEdges() {
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < MAX_DISTANCE) {
                    const opacity = 1 - (dist / MAX_DISTANCE);
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.strokeStyle = `rgba(56, 189, 248, ${opacity * 0.5})`; // #38bdf8 with opacity
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        if (!isDark || !isVisible || !canvas) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        nodes.forEach(node => {
            node.update(canvas.width, canvas.height);
            node.draw(ctx);
        });
        
        drawEdges();
        
        animationFrameId = requestAnimationFrame(animate);
    }

    function startAnimation() {
        if (!animationFrameId) {
            animate();
        }
    }

    function stopAnimation() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    }

    function handleThemeChange(e) {
        // We override this slightly to link to the site's data-theme attribute
        // rather than just the OS preference, or both.
        // The prompt says "Detect active mode via window.matchMedia... Switch instantly when OS theme changes"
        isDark = e.matches;
        
        // Also check if there's a body override for theme
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            isDark = true;
        } else if (document.documentElement.getAttribute('data-theme') === 'light') {
            isDark = false;
        }

        if (isDark) {
            container.classList.add('dark-mode');
            if (isVisible) startAnimation();
        } else {
            container.classList.remove('dark-mode');
            stopAnimation();
        }
    }

    function handleVisibilityChange() {
        isVisible = !document.hidden;
        if (isVisible && isDark) {
            startAnimation();
        } else {
            stopAnimation();
        }
    }

    function init() {
        // Create container
        container = document.createElement('div');
        container.id = 'portfolio-bg';
        
        // Inject as first child of body
        if (document.body.firstChild) {
            document.body.insertBefore(container, document.body.firstChild);
        } else {
            document.body.appendChild(container);
        }

        // Initialize layers
        initLightMode();
        initDarkMode();

        // Listeners
        mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Initial theme check
        handleThemeChange(mediaQuery);

        mediaQuery.addEventListener('change', handleThemeChange);
        window.addEventListener('resize', resizeCanvas);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Custom observer for data-theme changes on html/body (specific to this site)
        const observer = new MutationObserver(() => {
            handleThemeChange(mediaQuery);
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        
        // Store observer for cleanup
        container._themeObserver = observer;
    }

    // Initialize as soon as DOM is ready, or immediately if already ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Export API
    window.PortfolioBG = {
        destroy() {
            stopAnimation();
            if (mediaQuery) {
                mediaQuery.removeEventListener('change', handleThemeChange);
            }
            window.removeEventListener('resize', resizeCanvas);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            
            if (container) {
                if (container._themeObserver) container._themeObserver.disconnect();
                if (container.parentNode) container.parentNode.removeChild(container);
                container = null;
            }
            canvas = null;
            ctx = null;
        }
    };

})();