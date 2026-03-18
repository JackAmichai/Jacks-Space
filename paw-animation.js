/**
 * Paw Print Interaction - Vizsla-style bounding paws
 * Lightweight, high-energy paw prints that bound across screen
 */

(function() {
    'use strict';
    
    const pawAssets = {
        dog: 'assets/paw-print.png',  // Will use default if not exists
        cat: 'assets/cat-paw.png'     // Will use default if not exists
    };
    
    // Fallback to emoji paws if assets don't exist
    const useEmojiFallback = true;
    const pawEmojis = ['🐾', '👣', '🐶', '🐱'];
    
    let activeHobby = null;
    let animationFrameId = null;
    const pawContainer = document.createElement('div');
    pawContainer.id = 'paw-print-container';
    pawContainer.style.position = 'fixed';
    pawContainer.style.top = '0';
    pawContainer.style.left = '0';
    pawContainer.style.width = '100%';
    pawContainer.style.height = '100%';
    pawContainer.style.pointerEvents = 'none';
    pawContainer.style.zIndex = '9999';
    pawContainer.style.overflow = 'hidden';
    
    // Preload paw images or create emoji elements
    const pawImages = [];
    ['assets/paw-print.png', 'assets/cat-paw.png', 'assets/dog-paw.png'].forEach(src => {
        const img = new Image();
        img.src = src;
        pawImages.push(img);
    });
    
    /**
     * Set the current hobby mode
     */
    window.setHobbyMode = function(hobby) {
        // Clear previous active state
        document.querySelectorAll('.hobby-mode-btn').forEach(btn => btn.classList.remove('active'));
        
        if (activeHobby === hobby) {
            activeHobby = null;
            stopPawAnimation();
            return;
        }

        activeHobby = hobby;
        
        // Mark button as active
        const activeBtn = Array.from(document.querySelectorAll('.hobby-mode-btn')).find(btn => {
            const onclickAttr = btn.getAttribute('onclick');
            return onclickAttr && onclickAttr.includes(`'${hobby}'`);
        });
        if (activeBtn) activeBtn.classList.add('active');
        
        // Start paw animation
        startPawAnimation();
    };

    /**
     * Start the paw bounding animation
     */
    function startPawAnimation() {
        document.body.appendChild(pawContainer);
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(updatePaws);
    }

    /**
     * Stop the paw animation
     */
    function stopPawAnimation() {
        cancelAnimationFrame(animationFrameId);
        pawContainer.innerHTML = '';
        if (pawContainer.parentNode) {
            pawContainer.parentNode.removeChild(pawContainer);
        }
    }

    /**
     * Update paw positions - called each frame
     */
    function updatePaws() {
        // Clear container
        pawContainer.innerHTML = '';
        
        // Generate 3-5 paws per frame for energetic effect
        const pawCount = Math.floor(Math.random() * 3) + 3;
        
        for (let i = 0; i < pawCount; i++) {
            createBoundingPaw();
        }
        
        animationFrameId = requestAnimationFrame(updatePaws);
    }

    /**
     * Create a single bounding paw
     */
    function createBoundingPaw() {
        const paw = document.createElement('div');
        paw.style.position = 'absolute';
        paw.style.fontSize = '24px';
        paw.style.userSelect = 'none';
        paw.style.pointerEvents = 'none';
        
        // Random paw type
        const pawType = Math.random() > 0.5 ? 'dog' : 'cat';
        const emojiIndex = Math.floor(Math.random() * pawEmojis.length);
        const emoji = pawEmojis[emojiIndex];
        
        // Use emoji for reliability
        paw.textContent = emoji;
        
        // Random starting position (bottom of screen)
        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight + 50; // Start below screen
        
        paw.style.left = `${startX}px`;
        paw.style.top = `${startY}px`;
        
        // Random velocity and rotation
        const velocityX = (Math.random() - 0.5) * 8; // Horizontal spread
        const velocityY = -Math.random() * 15 - 5; // Upward speed
        const rotation = Math.random() * 30 - 15; // Slight rotation
        const rotationSpeed = (Math.random() - 0.5) * 2;
        
        // Random size
        const scale = 0.8 + Math.random() * 0.4; // 0.8 to 1.2
        
        paw.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
        paw.style.opacity = '0.9';
        
        // Add to container
        pawContainer.appendChild(paw);
        
        // Animate this paw
        animatePaw(paw, {
            x: startX,
            y: startY,
            vx: velocityX,
            vy: velocityY,
            rotation: rotation,
            rotationSpeed: rotationSpeed,
            scale: scale,
            startTime: performance.now()
        });
    }

    /**
     * Animate a single paw
     */
    function animatePaw(pawElement, params) {
        const elapsed = performance.now() - params.startTime;
        const duration = 1200 + Math.random() * 800; // 1.2-2s duration
        
        if (elapsed > duration) {
            pawElement.remove();
            return;
        }
        
        // Progress (0 to 1)
        const progress = elapsed / duration;
        const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
        
        // Position with physics
        const currentX = params.x + params.vx * elapsed * 0.001;
        const currentY = params.y + params.vy * elapsed * 0.001 + 0.5 * 9.81 * (elapsed * 0.001) * (elapsed * 0.001); // Gravity
        
        // Rotation
        const currentRotation = params.rotation + params.rotationSpeed * elapsed * 0.001;
        
        // Scale (slight pulse)
        const pulseScale = params.scale * (1 + 0.1 * Math.sin(elapsed * 0.01));
        
        // Opacity fade out
        const opacity = 0.9 * (1 - easeProgress);
        
        pawElement.style.left = `${currentX}px`;
        pawElement.style.top = `${currentY}px`;
        pawElement.style.transform = `scale(${pulseScale}) rotate(${currentRotation}deg)`;
        pawElement.style.opacity = opacity.toString();
        
        // Request next frame
        requestAnimationFrame(() => animatePaw(pawElement, params));
    }

    /**
     * Escape key to reset everything
     */
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && activeHobby) {
            activeHobby = null;
            stopPawAnimation();
            document.querySelectorAll('.hobby-mode-btn').forEach(btn => btn.classList.remove('active'));
        }
    });

})();
