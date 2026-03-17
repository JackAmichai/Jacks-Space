/**
 * Hobby Easter Egg Logic
 * Mechanically identical to Google's Dog/Cat Paw.
 * Perspectives provided: CSS Keyframes (A) and Web Animations API (B).
 */

(function() {
    'use strict';

    const hobbyAssets = {
        traveling: { arm: 'assets/pilot-hand.png', stamp: 'assets/passport-stamp.png' },
        violin: { arm: 'assets/violin-bow.png', stamp: 'assets/music-note.png' },
        drawing: { arm: 'assets/pencil-hand.png', stamp: 'assets/comic-doodle.png' },
        reading: { arm: 'assets/reading-hand.png', stamp: 'assets/open-book.png' },
        plants: { arm: 'assets/watering-can.png', stamp: 'assets/flower.png' },
        gym: { arm: 'assets/muscular-arm.png', stamp: 'assets/dumbbell.png' }
    };

    let activeHobby = null;
    const animationLayer = document.getElementById('animation-layer');

    if (!animationLayer) {
        console.warn('Animation layer not found for Easter Egg');
        return;
    }

    // Persistence Check: Perspective Selection
    // Set to 'B' for WAAPI (Native JS), 'A' for CSS
    const ANIMATION_PERSPECTIVE = 'B'; 

    /**
     * Set the current hobby mode
     */
    window.setHobbyMode = function(hobby) {
        // Clear previous active state
        document.querySelectorAll('.hobby-mode-btn').forEach(btn => btn.classList.remove('active'));
        
        if (activeHobby === hobby) {
            activeHobby = null;
            animationLayer.classList.remove('active');
            return;
        }

        activeHobby = hobby;
        animationLayer.classList.add('active');
        
        // Mark button as active
        const activeBtn = Array.from(document.querySelectorAll('.hobby-mode-btn')).find(btn => {
            const onclickAttr = btn.getAttribute('onclick');
            return onclickAttr && onclickAttr.includes(`'${hobby}'`);
        });
        if (activeBtn) activeBtn.classList.add('active');
    };

    /**
     * Trigger the animation on click
     */
    animationLayer.addEventListener('mousedown', (e) => {
        if (!activeHobby) return;
        triggerReachingArm(e.clientX, e.clientY);
    });

    /**
     * Escape key to reset everything
     */
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            activeHobby = null;
            animationLayer.classList.remove('active');
            animationLayer.innerHTML = ''; // Clear all stamps
            document.querySelectorAll('.hobby-mode-btn').forEach(btn => btn.classList.remove('active'));
        }
    });

    /**
     * Calculate rotation from bottom center
     */
    function calculateRotation(targetX, targetY) {
        const startX = window.innerWidth / 2;
        const startY = window.innerHeight + 100; // Small offset offbeat
        const deltaX = targetX - startX;
        const deltaY = targetY - startY;
        return (Math.atan2(deltaY, deltaX) * (180 / Math.PI)) + 90;
    }

    /**
     * THE CORE ANIMATOR
     */
    function triggerReachingArm(targetX, targetY) {
        const assets = hobbyAssets[activeHobby];
        
        // Randomize start edge (Bottom, Left, Right)
        const edges = ['bottom', 'left', 'right'];
        const edge = edges[Math.floor(Math.random() * edges.length)];
        
        let startX, startY;
        if (edge === 'bottom') {
            startX = Math.random() * window.innerWidth;
            startY = window.innerHeight + 100;
        } else if (edge === 'left') {
            startX = -100;
            startY = Math.random() * window.innerHeight;
        } else {
            startX = window.innerWidth + 100;
            startY = Math.random() * window.innerHeight;
        }

        const deltaX = targetX - startX;
        const deltaY = targetY - startY;
        const rotation = (Math.atan2(deltaY, deltaX) * (180 / Math.PI)) + 90;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        const arm = document.createElement('img');
        arm.src = assets.arm;
        arm.className = 'easter-arm';
        
        // Initial setup
        arm.style.left = `${startX - 60}px`;
        arm.style.top = `${startY}px`;
        arm.style.transform = `rotate(${rotation}deg)`;
        
        document.body.appendChild(arm);

        if (ANIMATION_PERSPECTIVE === 'B') {
            // PERSPECTIVE B: Web Animations API (WAAPI)
            const animation = arm.animate([
                { transform: `rotate(${rotation}deg) translateY(0)` },
                { transform: `rotate(${rotation}deg) translateY(-${distance + 80}px)` }, // Reach slightly past to ensure "tap"
                { transform: `rotate(${rotation}deg) translateY(0)` }
            ], {
                duration: 800,
                easing: 'cubic-bezier(0.2, 0, 0.2, 1)'
            });

            animation.onfinish = () => arm.remove();
            
            // Stamp timing - midway
            setTimeout(() => leaveStamp(targetX, targetY, assets.stamp), 350);

        } else {
            // PERSPECTIVE A: CSS Keyframes
            arm.style.setProperty('--target-y', `-${distance + 80}px`);
            arm.style.setProperty('--rot', `${rotation}deg`);
            arm.classList.add('arm-animate');
            
            setTimeout(() => leaveStamp(targetX, targetY, assets.stamp), 350);
            setTimeout(() => arm.remove(), 800);
        }
    }

    function leaveStamp(x, y, src) {
        const stamp = document.createElement('img');
        stamp.src = src;
        stamp.className = 'easter-stamp';
        stamp.style.left = `${x}px`;
        stamp.style.top = `${y}px`;
        
        // Random rotation for natural feel
        const randomRot = Math.random() * 60 - 30;
        stamp.style.transform = `translate(-50%, -50%) rotate(${randomRot}deg) scale(1.2)`;
        
        animationLayer.appendChild(stamp);
        
        // Slight pop-in effect
        stamp.animate([
            { transform: `translate(-50%, -50%) rotate(${randomRot}deg) scale(0)`, opacity: 0 },
            { transform: `translate(-50%, -50%) rotate(${randomRot}deg) scale(1.2)`, opacity: 1 }
        ], { duration: 200, easing: 'ease-out' });
    }

})();
