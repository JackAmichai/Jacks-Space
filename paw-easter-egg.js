(function() {
    'use strict';

    const pawSvg = `<svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor"><path d="M12 8.5c-1.5 0-2.7-1.2-2.7-2.7S10.5 3.1 12 3.1s2.7 1.2 2.7 2.7-1.2 2.7-2.7 2.7zm-5.4 1.1c-1.2 0-2.2-1-2.2-2.2s1-2.2 2.2-2.2 2.2 1 2.2 2.2-1 2.2-2.2 2.2zm10.8 0c-1.2 0-2.2-1-2.2-2.2s1-2.2 2.2-2.2 2.2 1 2.2 2.2-1 2.2-2.2 2.2zm-5.4 11.3c-3 0-5.4-2.1-5.4-4.8 0-2 1.4-3.8 3.3-4.5 1.1-.4 2.2-.4 3.3 0 1.9.7 3.3 2.5 3.3 4.5 0 2.7-2.4 4.8-5.4 4.8z"/></svg>`;

    // Audio context (singleton)
    let audioCtx = null;
    function getAudioContext() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    }

    function playRaindropSound() {
        const ctx = getAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'sine';
        const now = ctx.currentTime;
        
        // Quick pitch drop
        osc.frequency.setValueAtTime(800 + Math.random() * 200, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.1);
        
        // Quick fade out
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.2, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(now);
        osc.stop(now + 0.1);
    }

    window.firePaws = function(animalType) {
        playRaindropSound();

        const paws = [];
        const isLeftEdge = Math.random() > 0.5;
        
        // Random starting position along the edge
        const startY = Math.random() * window.innerHeight * 0.8;
        
        let currentX = isLeftEdge ? -50 : window.innerWidth + 50;
        let currentY = startY;
        
        // Diagonal walking angle
        const walkAngle = isLeftEdge ? (Math.random() * 45 - 22.5) : (180 + Math.random() * 45 - 22.5);
        const rad = walkAngle * Math.PI / 180;
        const stride = 60;
        
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.pointerEvents = 'none';
        container.style.zIndex = '999999';
        container.style.overflow = 'hidden';
        document.body.appendChild(container);

        for (let i = 0; i < 16; i++) {
            const paw = document.createElement('div');
            paw.innerHTML = pawSvg;
            paw.style.position = 'absolute';
            paw.style.width = '40px';
            paw.style.height = '40px';
            paw.style.color = animalType === 'dog' ? '#5a3a22' : '#ff9800';
            paw.style.opacity = '0';
            
            // Offset left/right paw
            const isLeftPaw = i % 2 === 0;
            const perpAngle = rad + Math.PI / 2;
            const offset = isLeftPaw ? -20 : 20;
            
            const px = currentX + Math.cos(perpAngle) * offset;
            const py = currentY + Math.sin(perpAngle) * offset;
            
            // Rotation and mirroring
            const rotation = walkAngle + 90;
            const mirror = isLeftPaw ? 'scaleX(-1)' : 'scaleX(1)';
            
            paw.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) ${mirror}`;
            paw.style.left = px + 'px';
            paw.style.top = py + 'px';
            paw.style.transition = 'opacity 0.2s, transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            
            container.appendChild(paw);
            
            // Animation timings
            setTimeout(() => {
                paw.style.opacity = '0.8';
                paw.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) ${mirror} scale(1.2)`;
                
                setTimeout(() => {
                    paw.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) ${mirror} scale(1)`;
                }, 100);
                
                // Fade out
                setTimeout(() => {
                    paw.style.opacity = '0';
                }, 1400);
                
            }, i * 150); // Walk speed
            
            // Advance position
            currentX += Math.cos(rad) * stride;
            currentY += Math.sin(rad) * stride;
        }
        
        // Cleanup
        setTimeout(() => {
            if (container.parentNode) {
                container.parentNode.removeChild(container);
            }
        }, 16 * 150 + 2000);
    };

})();
