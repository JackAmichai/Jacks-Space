document.addEventListener('DOMContentLoaded', () => {
    const tour = new Shepherd.Tour({
        defaultStepOptions: {
            cancelIcon: {
                enabled: true
            },
            classes: 'custom-tour-theme',
            scrollTo: { behavior: 'smooth', block: 'center' }
        },
        useModalOverlay: true
    });

    tour.addStep({
        id: 'welcome',
        title: 'Welcome to My Portfolio!',
        text: `I'm Jack Amichai, an AI Solutions Engineer & Product Builder.<br>Here's a quick guide to explore my work:`,
        attachTo: {
            element: '.hero-name-minimal',
            on: 'bottom'
        },
        buttons: [
            {
                action() {
                    return this.next();
                },
                text: 'Next'
            }
        ]
    });

    tour.addStep({
        id: 'about',
        title: 'Core Competencies',
        text: 'Discover my specialized technical strengths in AI Solutions, Architecture, and Product Engineering.',
        attachTo: {
            element: '#skills',
            on: 'bottom'
        },
        buttons: [
            {
                action() {
                    return this.back();
                },
                secondary: true,
                text: 'Back'
            },
            {
                action() {
                    return this.next();
                },
                text: 'Next'
            }
        ]
    });

    tour.addStep({
        id: 'experience',
        title: 'Experience',
        text: 'Deloitte consulting, SAP BTP, and research at Technion',
        attachTo: {
            element: '#experience',
            on: 'bottom'
        },
        buttons: [
            {
                action() {
                    return this.back();
                },
                secondary: true,
                text: 'Back'
            },
            {
                action() {
                    return this.next();
                },
                text: 'Next'
            }
        ]
    });

    tour.addStep({
        id: 'projects',
        title: 'Projects',
        text: 'AI-powered apps including LeAIrn, Hatrick, and Scholar 2.6',
        attachTo: {
            element: '#projects',
            on: 'bottom'
        },
        buttons: [
            {
                action() {
                    return this.back();
                },
                secondary: true,
                text: 'Back'
            },
            {
                action() {
                    return this.next();
                },
                text: 'Next'
            }
        ]
    });

    tour.addStep({
        id: 'recommendations',
        title: 'Resources',
        text: 'Download my resume, case studies, and recommendations',
        attachTo: {
            element: '#recommendations',
            on: 'bottom'
        },
        buttons: [
            {
                action() {
                    return this.back();
                },
                secondary: true,
                text: 'Back'
            },
            {
                action() {
                    return this.next();
                },
                text: 'Next'
            }
        ]
    });

    tour.addStep({
        id: 'ai-assistant',
        title: 'AI Assistant',
        text: 'Ask my AI assistant anything about me (bottom right)',
        attachTo: {
            element: '#chatbot-bubble',
            on: 'top'
        },
        buttons: [
            {
                action() {
                    return this.back();
                },
                secondary: true,
                text: 'Back'
            },
            {
                action() {
                    return this.next();
                },
                text: 'Next'
            }
        ]
    });

    tour.addStep({
        id: 'contact',
        title: 'Contact Me',
        text: 'Ready to build something great? Connect with me directly through any of these channels!',
        attachTo: {
            element: '#contact',
            on: 'top'
        },
        buttons: [
            {
                action() {
                    return this.back();
                },
                secondary: true,
                text: 'Back'
            },
            {
                action() {
                    return this.complete();
                },
                text: 'Finish'
            }
        ]
    });

    // Check if user has already seen the tour
    const tourSeen = localStorage.getItem('tour_seen');

    if (!tourSeen) {
        // Show the modal after a short delay
        setTimeout(() => {
            displayTourModal(tour);
        }, 500);
    }

    // Make tour trigger globally accessible
    window.showTourModal = () => displayTourModal(tour);
    window.startTour = () => tour.start();
});

function displayTourModal(tour) {
    // Create modal element if it doesn't exist
    if (!document.getElementById('tour-modal')) {
        createTourModal(tour);
    }

    const modal = document.getElementById('tour-modal');
    modal.style.display = 'flex';
    // Force a small delay to allow display:flex to apply before opacity transition
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeTourModal(tour, dontShowAgain = false) {
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

function createTourModal(tour) {
    const modalHTML = `
      <div class="tour-modal-overlay">
          <div class="tour-modal-content">
              <button class="tour-close-btn" aria-label="Close tour">&times;</button>

              <div class="tour-header">
                  <div class="tour-avatar">
                      <img src="images/intro pic Elon-Jack tour.png" alt="Jack Amichai">
                  </div>
                  <h2>Welcome to My Portfolio!</h2>
                  <p>I'm Jack Amichai, an AI Solutions Engineer & Product Builder.<br>Here's a quick guide to explore my work:</p>
              </div>

              <div class="tour-steps">
                  <div class="tour-step">
                      <div class="step-number">1</div>
                      <div class="step-info">
                          <strong>Core Competencies</strong>
                          <p>Discover my specialized technical strengths in AI & Architecture</p>
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
                          <strong>AI Assistant</strong>
                          <p>Ask my AI assistant anything about me (bottom right)</p>
                      </div>
                  </div>
                  <div class="tour-step">
                      <div class="step-number">6</div>
                      <div class="step-info">
                          <strong>Contact Me</strong>
                          <p>Ready to build? Let's connect directly!</p>
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
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

      /* Custom Shepherd Theme */
      .custom-tour-theme {
          font-family: 'Inter', sans-serif;
          background: #ffffff;
          border: 1px solid var(--border-color, #e2e8f0);
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
      }
      .custom-tour-theme .shepherd-text {
          color: var(--text-secondary, #475569);
          font-size: 1.1rem;
          line-height: 1.6;
          padding: 1.5rem;
      }
      .custom-tour-theme .shepherd-header {
          background: var(--bg-secondary, #f8fafc);
          padding: 1.25rem 1.5rem;
          border-top-left-radius: 15px;
          border-top-right-radius: 15px;
          border-bottom: 1px solid var(--border-color, #e2e8f0);
      }
      .custom-tour-theme .shepherd-title {
          font-size: 1.25rem;
          color: var(--text-primary, #1e293b);
          font-weight: 700;
          margin: 0;
      }
      .custom-tour-theme .shepherd-button {
          background: var(--accent, #0066cc);
          color: white;
          border-radius: 8px;
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          padding: 10px 20px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
          margin-right: 0.5rem;
      }
      .custom-tour-theme .shepherd-button:hover {
          background: var(--accent-hover, #0052a3);
          transform: translateY(-1px);
      }
      .custom-tour-theme .shepherd-button-secondary {
          background: transparent;
          color: var(--text-secondary, #475569);
          border: 1px solid var(--border-color, #e2e8f0);
      }
      .custom-tour-theme .shepherd-button-secondary:hover {
          background: var(--bg-secondary, #f8fafc);
          color: var(--text-primary, #1e293b);
      }
      .custom-tour-theme .shepherd-cancel-icon {
          color: var(--text-muted, #94a3b8);
          font-size: 1.5rem;
      }

      /* Intro Modal Theme */
      .tour-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
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
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
      }
      .tour-modal-content {
          position: relative;
          background: var(--bg-primary, #ffffff);
          width: 90%;
          max-width: 550px;
          max-height: 90vh;
          overflow-y: auto;
          border-radius: 24px;
          border: 1px solid var(--border-color, #e2e8f0);
          padding: 40px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          text-align: center;
          transform: translateY(20px);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          color: var(--text-primary, #1e293b);
          font-family: 'Inter', sans-serif;
          margin: auto;
      }
      .tour-modal.active .tour-modal-content {
          transform: translateY(0);
      }
      [data-theme='dark'] .tour-modal-content {
          background: #002244;
          color: #fff;
          border: 1px solid #66b3ff;
      }
      .tour-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: var(--bg-secondary, #f8fafc);
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: var(--text-secondary, #475569);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
      }
      .tour-close-btn:hover {
          background: var(--border-color, #e2e8f0);
          color: var(--text-primary, #1e293b);
      }
      .tour-avatar {
          width: 100%;
          max-width: 280px;
          height: auto;
          margin: 0 auto 24px;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      }
      .tour-avatar img {
          width: 100%;
          height: auto;
          display: block;
      }
      .tour-header h2 {
          font-size: 2rem;
          margin-bottom: 12px;
          color: var(--text-primary, #1e293b);
          font-weight: 800;
          letter-spacing: -0.02em;
      }
      [data-theme='dark'] .tour-header h2 {
          color: #66b3ff;
      }
      .tour-header p {
          font-size: 1.1rem;
          color: var(--text-secondary, #475569);
          margin-bottom: 32px;
          line-height: 1.6;
      }
      [data-theme='dark'] .tour-header p {
          color: #cce0ff;
      }
      .tour-steps {
          text-align: left;
          margin-bottom: 32px;
          display: flex;
          flex-direction: column;
          gap: 12px;
      }
      .tour-step {
          display: flex;
          align-items: center;
          padding: 16px;
          background: var(--bg-secondary, #f8fafc);
          border-radius: 16px;
          border: 1px solid var(--border-color, #e2e8f0);
          transition: transform 0.2s;
      }
      [data-theme='dark'] .tour-step {
          background: rgba(0, 102, 204, 0.2);
          border-color: #66b3ff;
      }
      .tour-step:hover {
          transform: translateX(4px);
      }
      .step-number {
          width: 32px;
          height: 32px;
          background: var(--accent, #0066cc);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 700;
          margin-right: 16px;
          flex-shrink: 0;
      }
      .step-info strong {
          display: block;
          margin-bottom: 2px;
          font-size: 1.05rem;
          color: var(--text-primary, #1e293b);
          font-weight: 700;
      }
      [data-theme='dark'] .step-info strong {
          color: #66b3ff;
      }
      .step-info p {
          font-size: 0.95rem;
          color: var(--text-secondary, #475569);
          margin: 0;
          line-height: 1.4;
      }
      [data-theme='dark'] .step-info p {
          color: #cce0ff;
      }
      .tour-footer {
          margin-top: 32px;
      }
      .tour-buttons {
          display: flex;
          gap: 12px;
          justify-content: center;
          margin-bottom: 20px;
      }
      .tour-buttons button {
          flex: 1;
          padding: 14px 24px;
          border-radius: 12px;
          font-weight: 700;
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s;
      }
      .btn-primary {
          background: var(--accent, #0066cc);
          color: white;
          border: none;
          box-shadow: 0 4px 12px rgba(0, 102, 204, 0.2);
      }
      .btn-primary:hover {
          background: var(--accent-hover, #0052a3);
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 102, 204, 0.3);
      }
      .btn-secondary {
          background: var(--bg-secondary, #f8fafc);
          border: 1px solid var(--border-color, #e2e8f0);
          color: var(--text-primary, #1e293b);
      }
      [data-theme='dark'] .btn-secondary {
          border-color: #66b3ff;
          color: #66b3ff;
          background: transparent;
      }
      .btn-secondary:hover {
          background: var(--border-color, #e2e8f0);
      }
      [data-theme='dark'] .btn-secondary:hover {
          background: rgba(102, 179, 255, 0.2);
      }
      .tour-checkbox {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 0.95rem;
          color: var(--text-secondary, #475569);
          cursor: pointer;
          user-select: none;
      }
      [data-theme='dark'] .tour-checkbox {
          color: #cce0ff;
      }
      .tour-checkbox input {
          width: 16px;
          height: 16px;
          accent-color: var(--accent, #0066cc);
      }
  `;
    document.head.appendChild(style);

    // Event Listeners
    const modal = div;
    modal.querySelector('.tour-close-btn').addEventListener('click', () => closeTourModal(tour));
    modal.querySelector('#tour-skip').addEventListener('click', () => closeTourModal(tour, modal.querySelector('#tour-dont-show').checked));

    modal.querySelector('#tour-start').addEventListener('click', () => {
        const dontShow = modal.querySelector('#tour-dont-show').checked;
        closeTourModal(tour, dontShow);
        tour.start();
    });
}
