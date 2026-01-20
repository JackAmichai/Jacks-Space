
// Skills Universe - Interactive 3D Skills Visualization
// Uses Three.js for rendering and basic motion detection for hand control

// Skill data with categories for color coding
const skillsData = [
    // Technical Skills (Blue)
    { name: 'Python', category: 'technical', size: 1.2, description: 'Primary language for AI/ML and data analysis' },
    { name: 'TypeScript', category: 'technical', size: 1.0, description: 'Full-stack web development' },
    { name: 'JavaScript', category: 'technical', size: 1.0, description: 'Frontend and Node.js development' },
    { name: 'React', category: 'technical', size: 1.1, description: 'Modern UI frameworks' },
    { name: 'SQL', category: 'technical', size: 0.9, description: 'Database queries and analytics' },
    { name: 'LangChain', category: 'technical', size: 1.0, description: 'AI agent orchestration' },
    { name: 'OpenAI API', category: 'technical', size: 1.0, description: 'LLM integration' },
    { name: 'FastAPI', category: 'technical', size: 0.8, description: 'Python backend services' },
    { name: 'Node.js', category: 'technical', size: 0.9, description: 'Server-side JavaScript' },
    { name: 'Git', category: 'technical', size: 0.7, description: 'Version control' },
    { name: 'C++', category: 'technical', size: 0.8, description: 'Performance-critical applications' },
    
    // Business Skills (Pink)
    { name: 'Business Analysis', category: 'business', size: 1.2, description: 'Requirements and process optimization' },
    { name: 'Revenue Analytics', category: 'business', size: 1.1, description: 'Forecasting and pricing models' },
    { name: 'Power BI', category: 'business', size: 1.0, description: 'Executive dashboards' },
    { name: 'SAP BTP', category: 'business', size: 0.9, description: 'Enterprise cloud platform' },
    { name: 'Agile/Scrum', category: 'business', size: 0.8, description: 'Project methodology' },
    { name: 'Excel', category: 'business', size: 0.7, description: 'Data modeling and analysis' },
    
    // Research Skills (Green)
    { name: 'Research Design', category: 'research', size: 1.0, description: 'Experimental methodology' },
    { name: 'SPSS', category: 'research', size: 0.8, description: 'Statistical analysis' },
    { name: 'Data Analysis', category: 'research', size: 1.1, description: 'Insights from complex datasets' },
    { name: 'Psychology', category: 'research', size: 1.0, description: 'Human behavior and cognition' },
    { name: 'Academic Writing', category: 'research', size: 0.7, description: 'Research communication' },
    
    // Leadership Skills (Yellow)
    { name: 'Team Leadership', category: 'leadership', size: 1.1, description: 'IDF Staff Sergeant experience' },
    { name: 'Project Management', category: 'leadership', size: 1.0, description: 'End-to-end delivery' },
    { name: 'Stakeholder Management', category: 'leadership', size: 0.9, description: 'Cross-functional collaboration' },
    { name: 'Mentoring', category: 'leadership', size: 0.8, description: 'Training team members' },
];

// Category colors
const categoryColors = {
    technical: 0x60a5fa,  // Blue
    business: 0xf472b6,   // Pink
    research: 0x34d399,   // Green
    leadership: 0xfbbf24  // Yellow
};

class MilkyWayExperience {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error('Container not found');
            return;
        }

        // Three.js objects
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.galaxy = null;
        this.skillStars = [];  // Store skill star meshes for raycasting
        this.raycaster = new THREE.Raycaster();
        this.mouseVec = new THREE.Vector2();
        this.hoveredSkill = null;

        // Interaction state
        this.mouse = { x: 0, y: 0, down: false };
        this.rotation = { x: 0.5, y: 0 }; // Start tilted so galaxy is visible
        this.targetRotation = { x: 0.5, y: 0 };
        this.zoom = 6;
        this.autoRotate = true;

        // Camera/hand tracking
        this.cameraEnabled = false;
        this.videoElement = null;
        this.canvasElement = null;
        this.handTrackingActive = false;

        this.init();
    }

    init() {
        if (!window.THREE) {
            console.error('Three.js not loaded');
            this.showError('Three.js library not loaded. Please refresh the page.');
            return;
        }

        this.initScene();
        this.createGalaxy();
        this.createSkillStars();  // Add skill stars
        this.setupControls();
        this.setupSkillHover();   // Add hover detection
        this.animate();

        window.addEventListener('resize', () => this.onResize());
    }

    initScene() {
        const THREE = window.THREE;

        // Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000510);

        // Camera - positioned higher for better angle
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.container.clientWidth / this.container.clientHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 3, this.zoom);
        this.camera.lookAt(0, 0, 0);

        // Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);
    }

    createGalaxy() {
        const THREE = window.THREE;
        const galaxyGroup = new THREE.Group();

        // Galaxy core - bright center
        const coreGeometry = new THREE.SphereGeometry(0.2, 32, 32);
        const coreMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffcc,
            transparent: true,
            opacity: 1
        });
        const core = new THREE.Mesh(coreGeometry, coreMaterial);
        galaxyGroup.add(core);

        // Glow around core
        const glowGeometry = new THREE.SphereGeometry(0.4, 32, 32);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0xffaa44,
            transparent: true,
            opacity: 0.3
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        galaxyGroup.add(glow);

        // Spiral arms particles - more particles, better distribution
        const particleCount = 25000;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        const colorInner = new THREE.Color(0xff6030); // Orange core
        const colorOuter = new THREE.Color(0x1b5984); // Blue arms

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            // Better spiral calculation
            const radius = Math.pow(Math.random(), 0.5) * 4 + 0.3;
            const branch = i % 3; // 3 spiral arms
            const branchAngle = (branch / 3) * Math.PI * 2;
            const spinAngle = radius * 1.5; // How tightly wound
            const angle = branchAngle + spinAngle;

            // Add randomness
            const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.5;
            const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.2;
            const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.5;

            positions[i3] = Math.cos(angle) * radius + randomX;
            positions[i3 + 1] = randomY * (1 - radius / 5); // Flatter at edges
            positions[i3 + 2] = Math.sin(angle) * radius + randomZ;

            // Color gradient from core to edge
            const mixedColor = colorInner.clone();
            mixedColor.lerp(colorOuter, radius / 4);
            const brightness = 0.5 + Math.random() * 0.5;

            colors[i3] = mixedColor.r * brightness;
            colors[i3 + 1] = mixedColor.g * brightness;
            colors[i3 + 2] = mixedColor.b * brightness;
        }

        const particlesGeometry = new THREE.BufferGeometry();
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.03,
            vertexColors: true,
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });

        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        galaxyGroup.add(particles);

        // Background stars
        const starsGeometry = new THREE.BufferGeometry();
        const starsCount = 5000;
        const starsPositions = new Float32Array(starsCount * 3);

        for (let i = 0; i < starsCount * 3; i++) {
            starsPositions[i] = (Math.random() - 0.5) * 30;
        }

        starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));
        const starsMaterial = new THREE.PointsMaterial({
            size: 0.015,
            color: 0xffffff,
            transparent: true,
            opacity: 0.7
        });

        const stars = new THREE.Points(starsGeometry, starsMaterial);
        this.scene.add(stars);

        this.galaxy = galaxyGroup;
        this.scene.add(this.galaxy);
    }

    createSkillStars() {
        // Create larger, clickable stars for each skill
        const skillGroup = new THREE.Group();
        
        skillsData.forEach((skill, index) => {
            // Position skills in a spiral pattern within the galaxy
            const angle = (index / skillsData.length) * Math.PI * 4;
            const radius = 1 + (index / skillsData.length) * 2.5;
            
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const y = (Math.random() - 0.5) * 0.3;
            
            // Create skill star geometry
            const geometry = new THREE.SphereGeometry(0.08 * skill.size, 16, 16);
            const color = categoryColors[skill.category] || 0xffffff;
            const material = new THREE.MeshBasicMaterial({
                color: color,
                transparent: true,
                opacity: 0.9
            });
            
            const star = new THREE.Mesh(geometry, material);
            star.position.set(x, y, z);
            star.userData = skill;  // Store skill data for hover
            
            // Add glow effect
            const glowGeometry = new THREE.SphereGeometry(0.12 * skill.size, 16, 16);
            const glowMaterial = new THREE.MeshBasicMaterial({
                color: color,
                transparent: true,
                opacity: 0.3
            });
            const glow = new THREE.Mesh(glowGeometry, glowMaterial);
            star.add(glow);
            
            this.skillStars.push(star);
            skillGroup.add(star);
        });
        
        this.skillGroup = skillGroup;
        this.galaxy.add(skillGroup);
    }

    setupSkillHover() {
        const canvas = this.renderer.domElement;
        const tooltip = document.getElementById('skill-tooltip');
        
        canvas.addEventListener('mousemove', (e) => {
            // Update mouse vector for raycasting
            const rect = canvas.getBoundingClientRect();
            this.mouseVec.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            this.mouseVec.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
            
            // Raycast to skill stars
            this.raycaster.setFromCamera(this.mouseVec, this.camera);
            const intersects = this.raycaster.intersectObjects(this.skillStars);
            
            if (intersects.length > 0) {
                const skill = intersects[0].object.userData;
                if (skill && skill.name) {
                    this.hoveredSkill = skill;
                    canvas.style.cursor = 'pointer';
                    
                    // Show tooltip
                    if (tooltip) {
                        tooltip.innerHTML = `
                            <strong>${skill.name}</strong>
                            <span class="skill-category">${skill.category}</span>
                            <p>${skill.description}</p>
                        `;
                        tooltip.style.left = (e.clientX - rect.left + 15) + 'px';
                        tooltip.style.top = (e.clientY - rect.top - 10) + 'px';
                        tooltip.classList.add('visible');
                    }
                    
                    // Highlight the star
                    intersects[0].object.scale.setScalar(1.3);
                }
            } else {
                if (this.hoveredSkill) {
                    // Reset previous hover
                    this.skillStars.forEach(star => star.scale.setScalar(1));
                    this.hoveredSkill = null;
                    canvas.style.cursor = 'grab';
                    if (tooltip) tooltip.classList.remove('visible');
                }
            }
        });
        
        canvas.addEventListener('mouseleave', () => {
            this.skillStars.forEach(star => star.scale.setScalar(1));
            this.hoveredSkill = null;
            if (tooltip) tooltip.classList.remove('visible');
        });
        
        // Click to show more info
        canvas.addEventListener('click', (e) => {
            if (this.hoveredSkill && !this.mouse.down) {
                // Could expand to show project examples using this skill
                console.log('Clicked skill:', this.hoveredSkill.name);
            }
        });
    }

    setupControls() {
        const canvas = this.renderer.domElement;
        canvas.style.cursor = 'grab';

        // Mouse controls
        canvas.addEventListener('mousedown', (e) => {
            this.mouse.down = true;
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.autoRotate = false;
            canvas.style.cursor = 'grabbing';
        });

        canvas.addEventListener('mousemove', (e) => {
            if (!this.mouse.down) return;

            const deltaX = e.clientX - this.mouse.x;
            const deltaY = e.clientY - this.mouse.y;

            this.targetRotation.y += deltaX * 0.01;
            this.targetRotation.x += deltaY * 0.01;

            // Limit vertical rotation
            this.targetRotation.x = Math.max(-1.5, Math.min(1.5, this.targetRotation.x));

            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        canvas.addEventListener('mouseup', () => {
            this.mouse.down = false;
            canvas.style.cursor = 'grab';
        });

        canvas.addEventListener('mouseleave', () => {
            this.mouse.down = false;
        });

        // Wheel zoom
        canvas.addEventListener('wheel', (e) => {
            e.preventDefault();
            this.zoom += e.deltaY * 0.01;
            this.zoom = Math.max(3, Math.min(15, this.zoom));
        }, { passive: false });

        // Touch controls
        let lastTouchDistance = 0;

        canvas.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                this.mouse.down = true;
                this.mouse.x = e.touches[0].clientX;
                this.mouse.y = e.touches[0].clientY;
                this.autoRotate = false;
            } else if (e.touches.length === 2) {
                const dx = e.touches[0].clientX - e.touches[1].clientX;
                const dy = e.touches[0].clientY - e.touches[1].clientY;
                lastTouchDistance = Math.sqrt(dx * dx + dy * dy);
            }
        });

        canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();

            if (e.touches.length === 1 && this.mouse.down) {
                const deltaX = e.touches[0].clientX - this.mouse.x;
                const deltaY = e.touches[0].clientY - this.mouse.y;

                this.targetRotation.y += deltaX * 0.01;
                this.targetRotation.x += deltaY * 0.01;
                this.targetRotation.x = Math.max(-1.5, Math.min(1.5, this.targetRotation.x));

                this.mouse.x = e.touches[0].clientX;
                this.mouse.y = e.touches[0].clientY;
            } else if (e.touches.length === 2) {
                const dx = e.touches[0].clientX - e.touches[1].clientX;
                const dy = e.touches[0].clientY - e.touches[1].clientY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (lastTouchDistance > 0) {
                    const delta = distance - lastTouchDistance;
                    this.zoom -= delta * 0.02;
                    this.zoom = Math.max(3, Math.min(15, this.zoom));
                }

                lastTouchDistance = distance;
            }
        }, { passive: false });

        canvas.addEventListener('touchend', () => {
            this.mouse.down = false;
            lastTouchDistance = 0;
        });
    }

    async enableHandControl() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user', width: 320, height: 240 }
            });

            // Create video element
            if (!this.videoElement) {
                this.videoElement = document.createElement('video');
                this.videoElement.className = 'webcam-feed';
                this.videoElement.autoplay = true;
                this.videoElement.playsInline = true;
                this.videoElement.muted = true;
                document.body.appendChild(this.videoElement);
            }

            // Create hidden canvas for processing
            if (!this.canvasElement) {
                this.canvasElement = document.createElement('canvas');
                this.canvasElement.width = 320;
                this.canvasElement.height = 240;
                this.canvasElement.style.display = 'none';
                document.body.appendChild(this.canvasElement);
            }

            this.videoElement.srcObject = stream;
            await this.videoElement.play();

            this.cameraEnabled = true;
            this.handTrackingActive = true;
            this.autoRotate = false;

            // Start hand detection loop
            this.detectHand();

            this.updateStatus('✋ Camera active! Move your hand to spin the galaxy.', 'success');

        } catch (error) {
            console.error('Camera error:', error);
            this.updateStatus('📷 Camera denied. Use mouse/touch to control!', 'warning');
            this.cameraEnabled = false;
        }
    }

    detectHand() {
        if (!this.handTrackingActive || !this.videoElement || !this.canvasElement) return;

        const ctx = this.canvasElement.getContext('2d');
        const width = this.canvasElement.width;
        const height = this.canvasElement.height;

        // Draw flipped video to canvas
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(this.videoElement, -width, 0, width, height);
        ctx.restore();

        // Simple motion/position detection using brightness centroid
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;

        let totalX = 0, totalY = 0, count = 0;

        // Sample every 4th pixel for performance
        for (let y = 0; y < height; y += 4) {
            for (let x = 0; x < width; x += 4) {
                const i = (y * width + x) * 4;
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];

                // Detect skin-like colors (rough heuristic)
                const brightness = (r + g + b) / 3;
                const isSkinLike = r > 95 && g > 40 && b > 20 &&
                    r > g && r > b &&
                    Math.abs(r - g) > 15 &&
                    brightness > 80 && brightness < 220;

                if (isSkinLike) {
                    totalX += x;
                    totalY += y;
                    count++;
                }
            }
        }

        if (count > 50) { // Enough skin pixels detected
            const avgX = totalX / count;
            const avgY = totalY / count;

            // Map position to rotation (-1 to 1)
            const normalizedX = (avgX / width) * 2 - 1;
            const normalizedY = (avgY / height) * 2 - 1;

            // Update target rotation
            this.targetRotation.y = normalizedX * 2;
            this.targetRotation.x = 0.5 + normalizedY * 0.8;
        }

        // Continue detection loop
        requestAnimationFrame(() => this.detectHand());
    }

    disableHandControl() {
        this.handTrackingActive = false;

        if (this.videoElement && this.videoElement.srcObject) {
            const stream = this.videoElement.srcObject;
            stream.getTracks().forEach(track => track.stop());
            this.videoElement.srcObject = null;
            if (document.body.contains(this.videoElement)) {
                document.body.removeChild(this.videoElement);
            }
            this.videoElement = null;
        }

        if (this.canvasElement && document.body.contains(this.canvasElement)) {
            document.body.removeChild(this.canvasElement);
            this.canvasElement = null;
        }

        this.cameraEnabled = false;
        this.autoRotate = true;
        this.updateStatus('🖱️ Drag to rotate • Scroll to zoom', 'info');
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        if (this.galaxy) {
            // Auto-rotate slowly if not being controlled
            if (this.autoRotate && !this.handTrackingActive) {
                this.targetRotation.y += 0.002;
            }

            // Smooth interpolation to target
            this.rotation.x += (this.targetRotation.x - this.rotation.x) * 0.08;
            this.rotation.y += (this.targetRotation.y - this.rotation.y) * 0.08;

            this.galaxy.rotation.x = this.rotation.x;
            this.galaxy.rotation.y = this.rotation.y;
        }

        // Update camera position for zoom
        this.camera.position.z = this.zoom;
        this.camera.position.y = 2 + (this.zoom - 6) * 0.3;

        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }

    onResize() {
        if (!this.camera || !this.renderer || !this.container) return;

        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }

    updateStatus(message, type = 'info') {
        const statusEl = document.getElementById('milky-way-status');
        if (statusEl) {
            statusEl.textContent = message;
        }
    }

    showError(message) {
        const statusEl = document.getElementById('milky-way-status');
        if (statusEl) {
            statusEl.textContent = `❌ ${message}`;
        }
    }
}

// Global initialization
window.initMilkyWay = () => {
    const experience = new MilkyWayExperience('milky-way-container');

    // Bind camera button
    const btn = document.getElementById('start-milky-way-btn');
    if (btn) {
        btn.addEventListener('click', () => {
            if (!experience.cameraEnabled) {
                experience.enableHandControl();
                btn.textContent = 'Disable Hand Control';
            } else {
                experience.disableHandControl();
                btn.textContent = 'Enable Hand Control';
            }
        });
    }

    // Update initial status
    experience.updateStatus('🖱️ Drag to rotate • Scroll to zoom • Click button for hand control');
};
