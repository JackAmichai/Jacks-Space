/**
 * Hobby Easter Egg Logic
 * Mechanically identical to Google's Dog/Cat Paw.
 * Cute, playful animations that follow cursor from edges.
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
    let hintElement = null;
    const animationLayer = document.getElementById('animation-layer');

    if (!animationLayer) {
        console.warn('Animation layer not found for Easter Egg');
        return;
    }

    function createHintMessage() {
        if (hintElement) return;
        hintElement = document.createElement('div');
        hintElement.className = 'easter-hint';
        hintElement.innerHTML = `
            <span class="hint-icon">✋</span>
            <span class="hint-text">Tap anywhere to stamp! Press <kbd>ESC</kbd> to exit</span>
        `;
        document.body.appendChild(hintElement);
    }

    function removeHintMessage() {
        if (hintElement) {
            hintElement.remove();
            hintElement = null;
        }
    }

    /**
     * Set the current hobby mode
     */
    window.setHobbyMode = function(hobby) {
        document.querySelectorAll('.hobby-mode-btn').forEach(btn => btn.classList.remove('active'));
        
        if (activeHobby === hobby) {
            activeHobby = null;
            animationLayer.classList.remove('active');
            removeHintMessage();
            return;
        }

        activeHobby = hobby;
        animationLayer.classList.add('active');
        createHintMessage();
        
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
     * Touch support
     */
    animationLayer.addEventListener('touchstart', (e) => {
        if (!activeHobby) return;
        e.preventDefault();
        const touch = e.touches[0];
        triggerReachingArm(touch.clientX, touch.clientY);
    }, { passive: false });

    /**
     * Escape key to reset everything
     */
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && activeHobby) {
            activeHobby = null;
            animationLayer.classList.remove('active');
            animationLayer.innerHTML = '';
            document.querySelectorAll('.hobby-mode-btn').forEach(btn => btn.classList.remove('active'));
            removeHintMessage();
        }
    });

    /**
     * THE CORE ANIMATOR - Bigger, cuter, more playful
     */
    function triggerReachingArm(targetX, targetY) {
        const assets = hobbyAssets[activeHobby];
        
        const edges = ['bottom', 'left', 'right'];
        const edge = edges[Math.floor(Math.random() * edges.length)];
        
        let startX, startY;
        let armWidth, armHeight;
        
        // Much bigger sizes for cuteness
        armWidth = 220; // Increased from 120px
        armHeight = 'auto';
        
        if (edge === 'bottom') {
            startX = Math.random() * window.innerWidth;
            startY = window.innerHeight + 150;
        } else if (edge === 'left') {
            startX = -150;
            startY = Math.random() * window.innerHeight;
        } else {
            startX = window.innerWidth + 150;
            startY = Math.random() * window.innerHeight;
        }

        const deltaX = targetX - startX;
        const deltaY = targetY - startY;
        const rotation = (Math.atan2(deltaY, deltaX) * (180 / Math.PI)) + 90;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        const arm = document.createElement('img');
        arm.src = assets.arm;
        arm.className = 'easter-arm';
        arm.style.width = armWidth + 'px';
        arm.style.height = armHeight;
        arm.style.zIndex = '10010';
        
        arm.style.left = `${startX - armWidth / 2}px`;
        arm.style.top = `${startY}px`;
        arm.style.transform = `rotate(${rotation}deg)`;
        arm.style.pointerEvents = 'none';
        
        document.body.appendChild(arm);

        // Slower, bouncier animation for cuteness
        const duration = 700;
        const animation = arm.animate([
            { transform: `rotate(${rotation}deg) translateY(0) scale(1)`, offset: 0 },
            { transform: `rotate(${rotation}deg) translateY(${-(distance + 100)}px) scale(1.1)`, offset: 0.4 },
            { transform: `rotate(${rotation}deg) translateY(${-(distance + 100)}px) scale(1.05)`, offset: 0.5 },
            { transform: `rotate(${rotation}deg) translateY(0) scale(1)`, offset: 1 }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' // Bouncy easing!
        });

        animation.onfinish = () => arm.remove();
        
        // Stamp timing - when arm reaches the point
        setTimeout(() => leaveStamp(targetX, targetY, assets.stamp), duration * 0.4);
    }

    function leaveStamp(x, y, src) {
        const stamp = document.createElement('img');
        stamp.src = src;
        stamp.className = 'easter-stamp';
        stamp.style.left = `${x}px`;
        stamp.style.top = `${y}px`;
        
        const randomRot = Math.random() * 50 - 25;
        
        animationLayer.appendChild(stamp);
        
        // Bouncy pop-in effect
        stamp.animate([
            { transform: `translate(-50%, -50%) rotate(${randomRot}deg) scale(0)`, opacity: 0 },
            { transform: `translate(-50%, -50%) rotate(${randomRot}deg) scale(1.3)`, opacity: 1, offset: 0.6 },
            { transform: `translate(-50%, -50%) rotate(${randomRot}deg) scale(1)`, opacity: 1 }
        ], { 
            duration: 300, 
            easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
        });
    }

})();
