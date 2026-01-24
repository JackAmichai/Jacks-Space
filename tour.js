/**
 * Website Tour / Welcome Modal
 * Shows a welcome popup on first visit explaining the portfolio sections.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Check if user has already seen the tour
    const tourSeen = localStorage.getItem('tour_seen');

    if (!tourSeen) {
        // Show the modal after a short delay
        setTimeout(() => {
            showTourModal();
        }, 1500);
    }
});

function showTourModal() {
    // Create modal element if it doesn't exist
    if (!document.getElementById('tour-modal')) {
        createTourModal();
    }

    const modal = document.getElementById('tour-modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeTourModal(dontShowAgain = false) {
    const modal = document.getElementById('tour-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
    document.body.style.overflow = ''; // Restore scrolling

    if (dontShowAgain) {
        localStorage.setItem('tour_seen', 'true');
    }
}

function createTourModal() {
    const modalHTML = `
        <div class="tour-modal-overlay">
            <div class="tour-modal-content">
                <button class="tour-close-btn" aria-label="Close tour">&times;</button>
                
                <div class="tour-header">
                    <div class="tour-avatar">
                        <img src="images/me.jpeg" alt="Jack Amichai">
                    </div>
                    <h2>Welcome to My Portfolio!</h2>
                    <p>I'm Jack Amichai, an AI Solutions Engineer & Product Builder.<br>Here's a quick guide to explore my work:</p>
                </div>

                <div class="tour-steps">
                    <div class="tour-step">
                        <div class="step-number">1</div>
                        <div class="step-info">
                            <strong>About Me</strong>
                            <p>Learn about my background in Psychology & Computer Science</p>
                        </div>
                    </div>
                    <div class="tour-step">
                        <div class="step-number">2</div>
                        <div class="step-info">
                            <strong>Experience</strong>
                            <p>Deloitte consulting, SAP BTP, and research at Technion</p>
                        </div>
                    </div>
                    <div class="tour-step">
                        <div class="step-number">3</div>
                        <div class="step-info">
                            <strong>Projects</strong>
                            <p>AI-powered apps including LeAIrn, Hatrick, and Scholar 2.6</p>
                        </div>
                    </div>
                    <div class="tour-step">
                        <div class="step-number">4</div>
                        <div class="step-info">
                            <strong>Resources</strong>
                            <p>Download my resume, case studies, and recommendations</p>
                        </div>
                    </div>
                    <div class="tour-step">
                        <div class="step-number">5</div>
                        <div class="step-info">
                            <strong>AI Chat</strong>
                            <p>Ask my AI assistant anything about me (bottom right)</p>
                        </div>
                    </div>
                </div>

                <div class="tour-footer">
                    <div class="tour-buttons">
                        <button class="btn-secondary" id="tour-skip">Skip Tour</button>
                        <button class="btn-primary" id="tour-start">Let's Go!</button>
                    </div>
                    <label class="tour-checkbox">
                        <input type="checkbox" id="tour-dont-show"> Don't show this again
                    </label>
                </div>
            </div>
        </div>
    `;

    const div = document.createElement('div');
    div.id = 'tour-modal';
    div.className = 'tour-modal';
    div.innerHTML = modalHTML;
    document.body.appendChild(div);

    // Add styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .tour-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }
        .tour-modal.active {
            opacity: 1;
            pointer-events: auto;
        }
        .tour-modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(5px);
        }
        .tour-modal-content {
            position: relative;
            background: white;
            width: 90%;
            max-width: 500px;
            max-height: 90vh;
            overflow-y: auto;
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.3);
            text-align: center;
            transform: translateY(20px);
            transition: transform 0.3s ease;
            color: #333;
        }
        .tour-modal.active .tour-modal-content {
            transform: translateY(0);
        }
        [data-theme='dark'] .tour-modal-content {
            background: #1a1a2e;
            color: #fff;
            border: 1px solid rgba(255,255,255,0.1);
        }
        .tour-close-btn {
            position: absolute;
            top: 15px;
            right: 15px;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #666;
        }
        [data-theme='dark'] .tour-close-btn {
            color: #aaa;
        }
        .tour-avatar {
            width: 80px;
            height: 80px;
            margin: 0 auto 15px;
            border-radius: 50%;
            overflow: hidden;
            border: 3px solid #0066cc;
            padding: 2px;
            background: white;
        }
        .tour-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
        }
        .tour-header h2 {
            font-size: 1.5rem;
            margin-bottom: 10px;
            color: #0066cc;
        }
        [data-theme='dark'] .tour-header h2 {
            color: #4ade80;
        }
        .tour-header p {
            font-size: 0.95rem;
            color: #666;
            margin-bottom: 25px;
            line-height: 1.5;
        }
        [data-theme='dark'] .tour-header p {
            color: #ccc;
        }
        .tour-steps {
            text-align: left;
            margin-bottom: 25px;
        }
        .tour-step {
            display: flex;
            align-items: flex-start;
            margin-bottom: 15px;
            padding: 10px;
            background: #f8f9fa;
            border-radius: 10px;
        }
        [data-theme='dark'] .tour-step {
            background: rgba(255,255,255,0.05);
        }
        .step-number {
            width: 24px;
            height: 24px;
            background: #0066cc;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-weight: bold;
            margin-right: 15px;
            flex-shrink: 0;
            margin-top: 2px;
        }
        .step-info strong {
            display: block;
            margin-bottom: 2px;
            font-size: 0.95rem;
        }
        .step-info p {
            font-size: 0.85rem;
            color: #666;
            margin: 0;
        }
        [data-theme='dark'] .step-info p {
            color: #aaa;
        }
        .tour-footer {
            margin-top: 20px;
        }
        .tour-buttons {
            display: flex;
            gap: 15px;
            justify-content: center;
            margin-bottom: 15px;
        }
        .tour-buttons button {
            padding: 10px 24px;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        }
        .btn-primary {
            background: #0066cc;
            color: white;
            border: none;
        }
        .btn-primary:hover {
            background: #0052a3;
        }
        .btn-secondary {
            background: transparent;
            border: 1px solid #ccc;
            color: #666;
        }
        [data-theme='dark'] .btn-secondary {
            border-color: #444;
            color: #aaa;
        }
        .btn-secondary:hover {
            background: #f0f0f0;
        }
        [data-theme='dark'] .btn-secondary:hover {
            background: rgba(255,255,255,0.1);
        }
        .tour-checkbox {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            font-size: 0.85rem;
            color: #666;
            cursor: pointer;
        }
        [data-theme='dark'] .tour-checkbox {
            color: #aaa;
        }
    `;
    document.head.appendChild(style);

    // Event Listeners
    modal.querySelector('.tour-close-btn').addEventListener('click', () => closeTourModal());
    modal.querySelector('#tour-skip').addEventListener('click', () => closeTourModal());

    modal.querySelector('#tour-start').addEventListener('click', () => {
        const dontShow = modal.querySelector('#tour-dont-show').checked;
        closeTourModal(dontShow);
        // Optional: Scroll to first section or trigger some animation
        document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
    });
}
