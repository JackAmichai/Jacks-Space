/**
 * Hobbies Advanced Stamp Effect Logic
 * Upgraded to Google-style "Reaching Arm" animation.
 */

(function() {
    'use strict';

    const iconSVGs = {
        violin: `<svg class="item-icon" viewBox="0 0 24 24" fill="#8B4513"><path d="M12,2L10.5,4.5L11,6C10,7 9,8.5 9,10C9,11.5 10,12 10,13C10,14 8,15 8,17C8,19 10,21 12,21C14,21 16,19 16,17C16,15 14,14 14,13C14,12 15,11.5 15,10C15,8.5 14,7 13,6L13.5,4.5L12,2Z"/></svg>`,
        books: `<svg class="item-icon" viewBox="0 0 24 24" fill="#4682B4"><path d="M4,6H18V18H4V6M20,8V20H6V22H22V8H20M2,4H16V6H2V4Z"/></svg>`,
        airplane: `<svg class="item-icon" viewBox="0 0 24 24" fill="#708090"><path d="M21,16L15,12.5V7A3,3 0 0,0 12,4A3,3 0 0,0 9,7V12.5L3,16V18L9,15V19L7,20.5V22L12,20.5L17,22V20.5L15,19V15L21,18V16Z"/></svg>`,
        weights: `<svg class="item-icon" viewBox="0 0 24 24" fill="#2F4F4F"><path d="M5,7V17H2V7H5M22,7V17H19V7H22M18,11V13H6V11H18M1,9H7V15H1V9M17,9H23V15H17V9Z"/></svg>`,
        plant: `<svg class="item-icon" viewBox="0 0 24 24" fill="#2E8B57"><path d="M12,3C12,3 12,13 12,13C12,13 16,9 16,9C16,9 19,10 19,10C19,10 12,21 12,21C12,21 5,10 5,10C5,10 8,9 8,9C8,9 12,13 12,13V3Z"/></svg>`,
        drawing: `<svg class="item-icon" viewBox="0 0 24 24" fill="#ec4899"><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"/></svg>`
    };

    let currentActiveType = null;
    let isActive = false;

    /**
     * Trigger the Google-style effect
     */
    window.triggerEffect = function(event, type) {
        if (event) event.stopPropagation();
        
        currentActiveType = type;
        isActive = true;
        
        const canvas = document.getElementById('interaction-canvas');
        const clearBtn = document.getElementById('clear-canvas-btn');
        
        if (canvas) canvas.classList.add('active');
        if (clearBtn) clearBtn.classList.add('visible');
        
        // Add first reaching animation
        triggerReach(event.clientX, event.clientY, type);
        
        // Setup global listener if not already done
        if (canvas && !canvas.onclick) {
            canvas.onclick = (e) => {
                if (isActive) triggerReach(e.clientX, e.clientY, currentActiveType);
            };
        }
    };

    /**
     * Animate the reaching arm
     */
    function triggerReach(x, y, type) {
        const arm = document.createElement('div');
        arm.className = 'reaching-arm';
        arm.innerHTML = iconSVGs[type];
        
        // Position Logic: Closest side (left, right, bottom)
        const vWidth = window.innerWidth;
        const vHeight = window.innerHeight;
        
        const distFromLeft = x;
        const distFromRight = vWidth - x;
        const distFromBottom = vHeight - y;
        
        const minDist = Math.min(distFromLeft, distFromRight, distFromBottom);
        
        if (minDist === distFromLeft) {
            arm.style.left = '-100px';
            arm.style.top = `${y - 30}px`;
            arm.style.transform = 'rotate(90deg)';
        } else if (minDist === distFromRight) {
            arm.style.right = '-100px';
            arm.style.top = `${y - 30}px`;
            arm.style.transform = 'rotate(-90deg)';
        } else {
            arm.style.bottom = '-100px';
            arm.style.left = `${x - 30}px`;
            arm.style.transform = 'rotate(0deg)';
        }
        
        document.body.appendChild(arm);

        // Animate in
        requestAnimationFrame(() => {
            setTimeout(() => {
                if (minDist === distFromLeft) {
                    arm.style.left = `${x - 15}px`;
                } else if (minDist === distFromRight) {
                    arm.style.right = `${vWidth - x - 15}px`;
                } else {
                    arm.style.bottom = `${vHeight - y - 15}px`;
                }

                // Leave mark and retreat
                setTimeout(() => {
                    leaveMark(x, y, type);
                    
                    if (minDist === distFromLeft) arm.style.left = '-100px';
                    else if (minDist === distFromRight) arm.style.right = '-100px';
                    else arm.style.bottom = '-100px';
                    
                    setTimeout(() => arm.remove(), 300);
                }, 250);
            }, 10);
        });
    }

    /**
     * Leave a permanent mark on the canvas
     */
    function leaveMark(x, y, type) {
        const canvas = document.getElementById('interaction-canvas');
        if (!canvas) return;
        
        const mark = document.createElement('div');
        mark.className = 'static-mark';
        mark.innerHTML = iconSVGs[type];
        mark.style.left = `${x}px`;
        mark.style.top = `${y}px`;
        
        // Random rotation for the mark
        const rotation = Math.random() * 40 - 20;
        mark.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
        
        canvas.appendChild(mark);
    }

    /**
     * Clear all marks and deactivate mode
     */
    window.clearStamps = function() {
        const canvas = document.getElementById('interaction-canvas');
        const clearBtn = document.getElementById('clear-canvas-btn');
        
        if (canvas) {
            canvas.innerHTML = '';
            canvas.classList.remove('active');
        }
        
        if (clearBtn) {
            clearBtn.classList.remove('visible');
        }
        
        isActive = false;
        currentActiveType = null;
    };

})();
