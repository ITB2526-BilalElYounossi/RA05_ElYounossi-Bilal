// ==================================================
// CORE SYSTEM - Funcionalidades comunes a todas las páginas
// ==================================================

class CyberSystem {
    constructor() {
        this.init();
    }

    init() {
        // Inicializar todas las funcionalidades
        this.setupCanvasBackground();
        this.setupNavigation();
        this.setupScrollAnimations();
        this.setupDynamicEffects();
        this.setupPageSpecificFeatures();
        this.setupFormValidation();
        this.setupProjectInteractions();
        this.setupSkillAnimations();
    }

    // ==================================================
    // CANVAS BACKGROUND - Partículas cyberpunk para toda la web
    // ==================================================
    setupCanvasBackground() {
        if (!document.getElementById('particles-canvas')) {
            const canvas = document.createElement('canvas');
            canvas.id = 'particles-canvas';
            canvas.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: -1;
            `;
            document.body.insertBefore(canvas, document.body.firstChild);
        }

        this.particles = new ParticlesSystem();
    }

    // ==================================================
    // NAVIGATION - Sistema de navegación inteligente
    // ==================================================
    setupNavigation() {
        // Highlight active page
        this.highlightActivePage();
        
        // Smooth scrolling para enlaces internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Efecto hover en navegación
        this.setupNavHoverEffects();
    }

    highlightActivePage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-links a').forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    setupNavHoverEffects() {
        document.querySelectorAll('.nav-links a, .page-nav a').forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(5px)';
                this.style.color = '#00ffaa';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
                this.style.color = '';
            });
        });

        // Efecto neón en logo
        const logo = document.querySelector('.logo');
        if (logo) {
            logo.addEventListener('mouseenter', function() {
                this.style.textShadow = '0 0 15px #00f0ff, 0 0 30px #00f0ff';
            });
            
            logo.addEventListener('mouseleave', function() {
                this.style.textShadow = '0 0 8px rgba(0, 240, 255, 0.5)';
            });
        }
    }

    // ==================================================
    // SCROLL ANIMATIONS - Efectos al hacer scroll
    // ==================================================
    setupScrollAnimations() {
        window.addEventListener('scroll', () => {
            this.animateOnScroll();
            this.handleScrollEffects();
        });
        
        // Forzar animación inicial
        setTimeout(() => {
            this.animateOnScroll();
        }, 300);
    }

    animateOnScroll() {
        // Elementos que se animan al hacer scroll
        const animatedElements = [
            '.project-card',
            '.skill-card', 
            '.tool-item',
            '.contact-item',
            '.about-content',
            '.section-title',
            '.hero-content'
        ];

        animatedElements.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                const position = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (position < screenPosition) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        });
    }

    handleScrollEffects() {
        const scrollY = window.scrollY;
        
        // Efecto de parallax en hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrollY * 0.3}px)`;
        }

        // Cambiar estilo de navbar al hacer scroll
        const topbar = document.querySelector('.topbar');
        if (topbar) {
            if (scrollY > 50) {
                topbar.classList.add('scrolled');
                topbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
            } else {
                topbar.classList.remove('scrolled');
                topbar.style.boxShadow = 'none';
            }
        }

        // Efecto de brillo en elementos visibles
        this.applyGlowEffectToVisibleElements();
    }

    applyGlowEffectToVisibleElements() {
        const elements = document.querySelectorAll('.project-card, .skill-card, .tool-item');
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
            
            if (isVisible) {
                element.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.3)';
            } else {
                element.style.boxShadow = '';
            }
        });
    }

    // ==================================================
    // DYNAMIC EFFECTS - Efectos interactivos
    // ==================================================
    setupDynamicEffects() {
        // Efecto de typing para textos
        this.setupTypingEffect();
        
        // Efecto glitch en elementos importantes
        this.setupGlitchEffects();
        
        // Efecto matrix en modo oscuro (opcional)
        this.setupMatrixEffect();
        
        // Efecto de neón pulsante
        this.setupPulsingNeon();
    }

    setupTypingEffect() {
        const typingElements = document.querySelectorAll('[data-typing]');
        typingElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            this.typeWriter(text, element, 30);
        });
    }

    typeWriter(text, element, speed = 50) {
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.textContent = text.substring(0, i + 1);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    setupGlitchEffects() {
        const glitchElements = document.querySelectorAll('.section-title, .logo, .cyber-icon, .btn');
        
        glitchElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.animation = 'glitch 0.3s infinite';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.animation = '';
            });
        });
    }

    setupMatrixEffect() {
        // Activar con un botón o automáticamente
        if (document.querySelector('.matrix-toggle')) {
            document.querySelector('.matrix-toggle').addEventListener('click', () => {
                document.body.classList.toggle('matrix-mode');
            });
        }
    }

    setupPulsingNeon() {
        const pulsingElements = document.querySelectorAll('.section-title, .btn, .contact-item i, .skill-level');
        
        pulsingElements.forEach(element => {
            let intensity = 0;
            let direction = 1;
            
            setInterval(() => {
                intensity += 0.03 * direction;
                if (intensity >= 1 || intensity <= 0) {
                    direction *= -1;
                }
                
                const glowStrength = intensity * 0.8;
                element.style.textShadow = `0 0 ${glowStrength * 10}px ${getComputedStyle(element).color}`;
                element.style.boxShadow = `0 0 ${glowStrength * 5}px ${getComputedStyle(element).color}`;
            }, 50);
        });
    }

    // ==================================================
    // PAGE SPECIFIC FEATURES - Funcionalidades por página
    // ==================================================
    setupPageSpecificFeatures() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        switch(currentPage) {
            case 'index.html':
            case '':
                this.setupHomePageFeatures();
                break;
            case 'proyectos.html':
                this.setupProjectsPageFeatures();
                break;
            case 'sobre-mi.html':
                this.setupAboutPageFeatures();
                break;
            case 'habilidades.html':
                this.setupSkillsPageFeatures();
                break;
            case 'contacto.html':
                this.setupContactPageFeatures();
                break;
        }
    }

    setupHomePageFeatures() {
        // Efecto hero section
        const heroTitle = document.querySelector('.hero h1');
        if (heroTitle) {
            this.typeWriter(heroTitle.textContent, heroTitle, 40);
        }

        // Efecto de tarjetas de proyectos
        this.setupProjectCardHoverEffects();
    }

    setupProjectsPageFeatures() {
        // Filtros de proyectos
        this.setupProjectFilters();
        
        // Modal para detalles de proyectos
        this.setupProjectModals();
    }

    setupAboutPageFeatures() {
        // Timeline animation
        this.setupTimelineAnimation();
        
        // Stats counters
        this.setupStatsCounters();
    }

    setupSkillsPageFeatures() {
        // Skill bars animation
        this.setupSkillBars();
        
        // Tool carousel
        this.setupToolCarousel();
    }

    setupContactPageFeatures() {
        // Form validation
        this.setupFormValidation();
        
        // Map interaction (si se añade)
        this.setupMapInteraction();
    }

    // ==================================================
    // PROJECT INTERACTIONS - Interacciones con proyectos
    // ==================================================
    setupProjectInteractions() {
        // Hover effects en tarjetas de proyectos
        this.setupProjectCardHoverEffects();
        
        // Filtros de categorías
        this.setupProjectFilters();
    }

    setupProjectCardHoverEffects() {
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 15px 30px rgba(0, 240, 255, 0.4)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '';
            });
        });
    }

    setupProjectFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remover clase active de todos los botones
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    } else {
                        card.style.opacity = '0.3';
                        card.style.transform = 'translateY(10px)';
                    }
                });
            });
        });
    }

    setupProjectModals() {
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('a')) {
                    this.showProjectModal(card.getAttribute('data-id'));
                }
            });
        });

        // Cerrar modal al hacer clic en el botón de cerrar
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-close') || e.target.classList.contains('modal')) {
                this.hideProjectModal();
            }
        });
    }

    showProjectModal(projectId) {
        // Aquí iría la lógica para mostrar el modal con detalles del proyecto
        console.log('Mostrando modal para proyecto:', projectId);
        
        // Crear modal si no existe
        if (!document.getElementById('project-modal')) {
            const modal = document.createElement('div');
            modal.id = 'project-modal';
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="modal-close">&times;</span>
                    <h2 class="section-title">Detalles del Proyecto</h2>
                    <div id="modal-content"></div>
                </div>
            `;
            document.body.appendChild(modal);
        }
        
        document.getElementById('project-modal').style.display = 'block';
    }

    hideProjectModal() {
        const modal = document.getElementById('project-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // ==================================================
    // SKILL ANIMATIONS - Animaciones para habilidades
    // ==================================================
    setupSkillAnimations() {
        this.setupSkillBars();
        this.setupToolCarousel();
    }

    setupSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar');
        
        skillBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            bar.style.width = '0%';
            
            // Animar cuando el elemento está visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        bar.style.width = `${level}%`;
                        bar.setAttribute('data-animated', 'true');
                        observer.disconnect();
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(bar);
        });
    }

    setupToolCarousel() {
        const carousel = document.querySelector('.tools-carousel');
        if (!carousel) return;
        
        let currentIndex = 0;
        const items = carousel.querySelectorAll('.tool-item');
        const totalItems = items.length;
        
        function showNextItem() {
            items.forEach(item => item.style.opacity = '0.3');
            items[currentIndex].style.opacity = '1';
            
            currentIndex = (currentIndex + 1) % totalItems;
        }
        
        // Mostrar primer item
        items[0].style.opacity = '1';
        
        // Cambiar cada 3 segundos
        setInterval(showNextItem, 3000);
    }

    // ==================================================
    // FORM VALIDATION - Validación de formularios
    // ==================================================
    setupFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                if (!this.validateForm(form)) {
                    e.preventDefault();
                    this.showMessage('Por favor, completa todos los campos correctamente', 'error');
                } else {
                    e.preventDefault();
                    this.handleSubmitForm(form);
                }
            });
            
            // Validación en tiempo real
            form.querySelectorAll('input, textarea').forEach(input => {
                input.addEventListener('blur', () => {
                    this.validateInput(input);
                });
            });
        });
    }

    validateForm(form) {
        let isValid = true;
        
        form.querySelectorAll('input[required], textarea[required]').forEach(input => {
            if (!this.validateInput(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    validateInput(input) {
        const value = input.value.trim();
        const isValid = value.length > 0;
        
        if (isValid) {
            input.parentElement.classList.add('valid');
            input.parentElement.classList.remove('error');
        } else {
            input.parentElement.classList.remove('valid');
            input.parentElement.classList.add('error');
        }
        
        return isValid;
    }

    handleSubmitForm(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Animación de carga
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitButton.classList.add('loading');
        
        // Simular envío asíncrono
        setTimeout(() => {
            const formData = new FormData(form);
            const name = formData.get('nombre') || 'Usuario';
            
            this.showMessage(`¡Gracias ${name}! Tu mensaje ha sido enviado correctamente`, 'success');
            
            // Resetear formulario
            form.reset();
            
            // Resetear botón
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
                submitButton.classList.remove('loading');
            }, 1500);
        }, 1500);
    }

    // ==================================================
    // UTILITY FUNCTIONS - Funciones de utilidad
    // ==================================================
    showMessage(text, type = 'info') {
        // Crear contenedor de mensaje si no existe
        let messageContainer = document.getElementById('cyber-messages');
        if (!messageContainer) {
            messageContainer = document.createElement('div');
            messageContainer.id = 'cyber-messages';
            messageContainer.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 9999;
                max-width: 300px;
            `;
            document.body.appendChild(messageContainer);
        }
        
        // Crear mensaje individual
        const message = document.createElement('div');
        message.className = `cyber-message ${type}`;
        message.style.cssText = `
            background: rgba(0, 10, 25, 0.9);
            border: 1px solid ${type === 'success' ? 'rgba(0, 255, 170, 0.5)' : type === 'error' ? 'rgba(255, 0, 100, 0.5)' : 'rgba(0, 240, 255, 0.5)'};
            color: ${type === 'success' ? '#00ffaa' : type === 'error' ? '#ff0066' : '#00f0ff'};
            padding: 15px 25px;
            border-radius: 8px;
            margin-bottom: 10px;
            font-family: 'Courier New', monospace;
            font-size: 0.95rem;
            opacity: 0;
            transform: translateX(100px);
            transition: all 0.3s ease;
            box-shadow: 0 0 15px ${type === 'success' ? 'rgba(0, 255, 170, 0.3)' : type === 'error' ? 'rgba(255, 0, 100, 0.3)' : 'rgba(0, 240, 255, 0.3)'};
            animation: float 3s ease-in-out infinite;
        `;
        
        message.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-times-circle' : 'fa-info-circle'}" style="margin-right: 10px;"></i>
            ${text}
        `;
        
        messageContainer.appendChild(message);
        
        // Mostrar mensaje
        setTimeout(() => {
            message.style.opacity = '1';
            message.style.transform = 'translateX(0)';
        }, 10);
        
        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
            message.style.opacity = '0';
            message.style.transform = 'translateX(100px)';
            setTimeout(() => {
                messageContainer.removeChild(message);
                // Eliminar contenedor si está vacío
                if (messageContainer.children.length === 0) {
                    document.body.removeChild(messageContainer);
                }
            }, 300);
        }, 5000);
    }

    setupMapInteraction() {
        // Aquí se podría añadir interacción con mapas si se implementa
        console.log('Map interaction setup');
    }

    setupTimelineAnimation() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach((item, index) => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateX(0)';
                        }, index * 200);
                        observer.disconnect();
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(item);
        });
    }

    setupStatsCounters() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            let count = 0;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const updateCount = () => {
                            const increment = target / 50;
                            if (count < target) {
                                count += increment;
                                counter.textContent = Math.ceil(count);
                                setTimeout(updateCount, 30);
                            } else {
                                counter.textContent = target;
                            }
                        };
                        
                        updateCount();
                        observer.disconnect();
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(counter);
        });
    }
}

// ==================================================
// PARTICLES SYSTEM - Sistema de partículas para fondo
// ==================================================
class ParticlesSystem {
    constructor() {
        this.canvas = document.getElementById('particles-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.lines = [];
        this.maxParticles = 100;
        this.mouse = {
            x: undefined,
            y: undefined,
            radius: 200
        };
        
        this.resizeCanvas();
        this.createParticles();
        this.animate();
        
        // Event listeners
        window.addEventListener('resize', () => this.resizeCanvas());
        window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        window.addEventListener('touchmove', (e) => this.handleTouchMove(e));
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.maxParticles; i++) {
            this.particles.push(new Particle(
                Math.random() * this.canvas.width,
                Math.random() * this.canvas.height,
                Math.random() * 3 + 1,
                this.ctx
            ));
        }
    }
    
    handleMouseMove(e) {
        this.mouse.x = e.x;
        this.mouse.y = e.y;
    }
    
    handleTouchMove(e) {
        if (e.touches[0]) {
            this.mouse.x = e.touches[0].clientX;
            this.mouse.y = e.touches[0].clientY;
        }
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Conectar partículas cercanas
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(0, 240, 255, ${0.1 - distance/1500})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
        
        // Actualizar y dibujar partículas
        this.particles.forEach(particle => {
            particle.update(this.mouse);
            particle.draw();
        });
    }
}

class Particle {
    constructor(x, y, radius, ctx) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.ctx = ctx;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.color = Math.random() < 0.5 ? '#00f0ff' : '#b967ff';
        this.originalX = x;
        this.originalY = y;
        this.angle = Math.random() * Math.PI * 2;
        this.distance = Math.random() * 30;
    }
    
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
    
    update(mouse) {
        // Movimiento sinuoso
        this.angle += 0.01;
        this.x = this.originalX + Math.cos(this.angle) * this.distance;
        this.y = this.originalY + Math.sin(this.angle) * this.distance;
        
        // Interacción con mouse
        if (mouse.x && mouse.y) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouse.radius) {
                const angle = Math.atan2(dy, dx);
                const force = (mouse.radius - distance) / mouse.radius;
                this.vx += Math.cos(angle) * force * 0.2;
                this.vy += Math.sin(angle) * force * 0.2;
            }
        }
        
        // Rebote en bordes
        if (this.x - this.radius < 0 || this.x + this.radius > window.innerWidth) {
            this.vx = -this.vx * 0.9;
        }
        if (this.y - this.radius < 0 || this.y + this.radius > window.innerHeight) {
            this.vy = -this.vy * 0.9;
        }
        
        this.x += this.vx;
        this.y += this.vy;
        
        // Fricción
        this.vx *= 0.99;
        this.vy *= 0.99;
    }
}

// ==================================================
// INICIALIZACIÓN - Iniciar el sistema cuando el DOM esté listo
// ==================================================
document.addEventListener('DOMContentLoaded', () => {
    // Iniciar sistema cyberpunk
    window.cyberSystem = new CyberSystem();
    
    console.log('CyberSystem initialized successfully!');
    
    // Efecto de carga inicial
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.8s ease';
    }, 100);
});

// ==================================================
// COMPILACIÓN - Cómo compilar todo el proyecto
// ==================================================

/**
 * PARA COMPILAR TODO EL PROYECTO:
 * 
 * 1. ESTRUCTURA DE ARCHIVOS:
 *    ├── index.html
 *    ├── proyectos.html
 *    ├── sobre-mi.html
 *    ├── habilidades.html
 *    ├── contacto.html
 *    ├── css/
 *    │   └── style.css
 *    ├── js/
 *    │   └── main.js
 *    └── img/
 *        └── (imágenes del proyecto)
 * 
 * 2. INSTALAR DEPENDENCIAS (Node.js):
 *    npm init -y
 *    npm install -D parcel-bundler
 * 
 * 3. CREAR SCRIPTS EN package.json:
 *    "scripts": {
 *      "dev": "parcel *.html",
 *      "build": "parcel build *.html --public-url ./"
 *    }
 * 
 * 4. EJECUTAR EN MODO DESARROLLO:
 *    npm run dev
 *    (Esto iniciará un servidor local en http://localhost:1234)
 * 
 * 5. COMPILAR PARA PRODUCCIÓN:
 *    npm run build
 *    (Esto generará una carpeta 'dist' con todos los archivos optimizados)
 * 
 * 6. DEPLOY EN GITHUB PAGES:
 *    - Copiar el contenido de la carpeta 'dist' al repositorio
 *    - Subir los cambios a GitHub
 *    - Activar GitHub Pages en Settings -> Pages
 * 
 * 7. OPTIMIZACIONES ADICIONALES:
 *    - Minificar CSS y JS automáticamente con Parcel
 *    - Optimizar imágenes con herramientas como ImageOptim
 *    - Añadir cache-busting para assets estáticos
 * 
 * 8. VARIABLES DE ENTORNO:
 *    Crear archivo .env en la raíz:
 *    PUBLIC_URL=./
 *    NODE_ENV=production
 * 
 * 9. SERVICIO WORKER (opcional para PWA):
 *    parcel build *.html --public-url ./ --no-source-maps
 * 
 * 10. COMANDO FINAL PARA DEPLOY:
 *     npm run build && cp -r dist/* ../RA05_ElYounossi-Bilal/
 * 
 * NOTA: Asegúrate de tener instalado Node.js y npm en tu sistema.
 * Para más información sobre Parcel: https://parceljs.org/
 */
