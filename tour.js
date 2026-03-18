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
        title: 'About Me',
        text: 'Learn about my background in Psychology & Computer Science',
        attachTo: {
            element: '#about',
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
        title: 'References',
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
        id: 'contact',
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
                          <strong>AI Assistant</strong>
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
      @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap');

      /* Custom Shepherd Theme */
      .custom-tour-theme {
          font-family: 'Caveat', cursive;
          background: #ffffff;
          border: 3px solid #0066cc;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,102,204,0.3);
      }
      .custom-tour-theme .shepherd-text {
          color: #004494;
          font-size: 1.4rem;
          line-height: 1.4;
      }
      .custom-tour-theme .shepherd-header {
          background: #e6f0fa;
          padding: 15px;
          border-top-left-radius: 9px;
          border-top-right-radius: 9px;
      }
      .custom-tour-theme .shepherd-title {
          font-size: 1.8rem;
          color: #0066cc;
          font-weight: 600;
          margin: 0;
      }
      .custom-tour-theme .shepherd-button {
          background: #0066cc;
          color: white;
          border-radius: 8px;
          font-family: 'Caveat', cursive;
          font-size: 1.3rem;
          padding: 8px 16px;
          font-weight: normal;
          border: none;
          cursor: pointer;
          transition: background 0.2s;
      }
      .custom-tour-theme .shepherd-button:hover {
          background: #0052a3;
      }
      .custom-tour-theme .shepherd-button-secondary {
          background: #e6f0fa;
          color: #0066cc;
          border: 1px solid #0066cc;
      }
      .custom-tour-theme .shepherd-button-secondary:hover {
          background: #cce0ff;
      }
      .custom-tour-theme .shepherd-cancel-icon {
          color: #0066cc;
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
          background: rgba(0, 50, 100, 0.7);
          backdrop-filter: blur(5px);
      }
      .tour-modal-content {
          position: relative;
          background: #ffffff;
          width: 90%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
          border-radius: 20px;
          border: 4px solid #0066cc;
          padding: 30px;
          box-shadow: 0 20px 50px rgba(0,102,204,0.3);
          text-align: center;
          transform: translateY(20px);
          transition: transform 0.3s ease;
          color: #004494;
          font-family: 'Caveat', cursive;
          margin: auto;
      }
      .tour-modal.active .tour-modal-content {
          transform: translateY(0);
      }
      [data-theme='dark'] .tour-modal-content {
          background: #002244;
          color: #fff;
          border: 4px solid #66b3ff;
      }
      .tour-close-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #0066cc;
      }
      [data-theme='dark'] .tour-close-btn {
          color: #66b3ff;
      }
      .tour-avatar {
          width: 200px;
          height: auto;
          margin: 0 auto 15px;
          border-radius: 12px;
          overflow: hidden;
          border: none;
          padding: 0;
          background: transparent;
      }
      .tour-avatar img {
          width: 100%;
          height: auto;
          object-fit: contain;
          border-radius: 12px;
      }
      .tour-header h2 {
          font-size: 2.8rem;
          margin-bottom: 5px;
          color: #0066cc;
          font-family: 'Caveat', cursive;
          line-height: 1.1;
      }
      [data-theme='dark'] .tour-header h2 {
          color: #66b3ff;
      }
      .tour-header p {
          font-size: 1.35rem;
          color: #004494;
          margin-bottom: 25px;
          line-height: 1.3;
      }
      [data-theme='dark'] .tour-header p {
          color: #cce0ff;
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
          background: #e6f0fa;
          border-radius: 10px;
          border: 1px dashed #0066cc;
      }
      [data-theme='dark'] .tour-step {
          background: rgba(0, 102, 204, 0.2);
          border-color: #66b3ff;
      }
      .step-number {
          width: 30px;
          height: 30px;
          background: #0066cc;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: bold;
          margin-right: 15px;
          flex-shrink: 0;
          margin-top: 2px;
          font-family: inherit;
      }
      .step-info strong {
          display: block;
          margin-bottom: 2px;
          font-size: 1.5rem;
          color: #0066cc;
      }
      [data-theme='dark'] .step-info strong {
          color: #66b3ff;
      }
      .step-info p {
          font-size: 1.25rem;
          color: #004494;
          margin: 0;
          line-height: 1.2;
      }
      [data-theme='dark'] .step-info p {
          color: #cce0ff;
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
          font-weight: normal;
          font-family: 'Caveat', cursive;
          font-size: 1.5rem;
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
          background: #e6f0fa;
          border: 1px solid #0066cc;
          color: #0066cc;
      }
      [data-theme='dark'] .btn-secondary {
          border-color: #66b3ff;
          color: #66b3ff;
          background: transparent;
      }
      .btn-secondary:hover {
          background: #cce0ff;
      }
      [data-theme='dark'] .btn-secondary:hover {
          background: rgba(102, 179, 255, 0.2);
      }
      .tour-checkbox {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 1.1rem;
          color: #004494;
          cursor: pointer;
      }
      [data-theme='dark'] .tour-checkbox {
          color: #cce0ff;
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
