// Partículas de fondo cyberpunk
class Particles {
    constructor() {
        this.canvas = document.getElementById('particles-canvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.maxParticles = 80;
        this.mouse = {
            x: undefined,
            y: undefined,
            radius: 150
        };
        
        this.init();
        this.animate();
        
        // Event listeners
        window.addEventListener('resize', () => this.resizeCanvas());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });
        window.addEventListener('touchmove', (e) => {
            this.mouse.x = e.touches[0].clientX;
            this.mouse.y = e.touches[0].clientY;
        });
    }
    
    init() {
        this.resizeCanvas();
        
        // Crear partículas
        for (let i = 0; i < this.maxParticles; i++) {
            this.particles.push(new Particle(
                Math.random() * this.canvas.width,
                Math.random() * this.canvas.height,
                Math.random() * 2 + 0.5,
                this.ctx
            ));
        }
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    animate() {
        if (!this.canvas) return;
        
        requestAnimationFrame(() => this.animate());
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Mover partículas y dibujar líneas
        this.particles.forEach(particle => {
            particle.update();
            particle.draw();
            
            // Dibujar líneas entre partículas cercanas
            this.particles.forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.strokeStyle = `rgba(0, 240, 255, ${0.1 - distance/1000})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.stroke();
                }
            });
            
            // Atraer partículas al mouse
            if (this.mouse.x && this.mouse.y) {
                const dx = this.mouse.x - particle.x;
                const dy = this.mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.mouse.radius) {
                    particle.vx += dx * 0.01;
                    particle.vy += dy * 0.01;
                }
            }
        });
    }
}

class Particle {
    constructor(x, y, radius, ctx) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.ctx = ctx;
        this.color = Math.random() < 0.5 ? '#00f0ff' : '#b967ff';
        this.originalX = x;
        this.originalY = y;
        this.angle = Math.random() * Math.PI * 2;
        this.distance = Math.random() * 50;
    }
    
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
    
    update() {
        // Movimiento sinuoso
        this.angle += 0.01;
        this.x = this.originalX + Math.cos(this.angle) * this.distance;
        this.y = this.originalY + Math.sin(this.angle) * this.distance;
        
        // Rebote en los bordes
        if (this.x - this.radius < 0 || this.x + this.radius > window.innerWidth) {
            this.vx = -this.vx;
        }
        if (this.y - this.radius < 0 || this.y + this.radius > window.innerHeight) {
            this.vy = -this.vy;
        }
        
        this.x += this.vx;
        this.y += this.vy;
    }
}

// Efecto de typing para el texto
function typeWriter(text, elementId, speed = 50) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent = text.substring(0, i + 1);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Animación al hacer scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.contact-item, .contact-section, .page-nav a');
    
    elements.forEach(element => {
        const position = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (position < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Validación del formulario con feedback visual
function setupFormValidation() {
    const form = document.getElementById('formulario-contacto');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
            if (input.value.trim() !== '') {
                input.parentElement.classList.add('filled');
            } else {
                input.parentElement.classList.remove('filled');
            }
        });
    });
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('.btn');
        const buttonText = submitButton.innerHTML;
        
        // Animación del botón al enviar
        submitButton.classList.add('loading');
        submitButton.innerHTML = 'Enviando...';
        submitButton.disabled = true;
        
        // Simular envío asíncrono
        setTimeout(() => {
            const nombre = document.getElementById('nombre').value;
            
            // Mostrar mensaje de éxito con efecto cyberpunk
            showMessage(`¡Gracias ${nombre}! Tu mensaje ha sido enviado correctamente. Te responderé pronto.`, 'success');
            
            // Resetear formulario
            this.reset();
            
            // Resetear botón
            setTimeout(() => {
                submitButton.classList.remove('loading');
                submitButton.innerHTML = buttonText;
                submitButton.disabled = false;
            }, 1500);
        }, 1500);
    });
}

// Mostrar mensaje con estilo cyberpunk
function showMessage(text, type = 'info') {
    // Crear contenedor de mensaje
    const messageContainer = document.createElement('div');
    messageContainer.className = `cyber-message ${type}`;
    messageContainer.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(-20px);
        background: rgba(0, 10, 25, 0.9);
        border: 1px solid ${type === 'success' ? 'rgba(0, 255, 170, 0.5)' : 'rgba(0, 240, 255, 0.5)'};
        color: ${type === 'success' ? '#00ffaa' : '#00f0ff'};
        padding: 15px 25px;
        border-radius: 8px;
        font-family: 'Courier New', monospace;
        font-size: 1rem;
        z-index: 1000;
        opacity: 0;
        transition: all 0.3s ease;
        box-shadow: 0 0 15px ${type === 'success' ? 'rgba(0, 255, 170, 0.3)' : 'rgba(0, 240, 255, 0.3)'};
        text-align: center;
    `;
    
    messageContainer.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}" style="margin-right: 10px;"></i>
        ${text}
    `;
    
    document.body.appendChild(messageContainer);
    
    // Mostrar mensaje
    setTimeout(() => {
        messageContainer.style.opacity = '1';
        messageContainer.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);
    
    // Ocultar mensaje después de 3 segundos
    setTimeout(() => {
        messageContainer.style.opacity = '0';
        messageContainer.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(() => {
            document.body.removeChild(messageContainer);
        }, 300);
    }, 3000);
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar partículas si existe el canvas
    if (document.getElementById('particles-canvas')) {
        new Particles();
    }
    
    // Efecto de typing para el texto descriptivo
    const descriptionElement = document.querySelector('.section-description');
    if (descriptionElement) {
        const descriptionText = descriptionElement.textContent;
        descriptionElement.id = 'typing-text';
        typeWriter(descriptionText, 'typing-text', 30);
    }
    
    // Establecer animaciones iniciales
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.6s ease, transform 0.6s ease ${index * 0.1}s`;
    });
    
    const formContainer = document.querySelector('.contact-section:last-child');
    if (formContainer) {
        formContainer.style.opacity = '0';
        formContainer.style.transform = 'translateY(30px)';
        formContainer.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    }
    
    // Mostrar elementos después de un pequeño retraso
    setTimeout(() => {
        contactItems.forEach(item => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        });
        
        if (formContainer) {
            setTimeout(() => {
                formContainer.style.opacity = '1';
                formContainer.style.transform = 'translateY(0)';
            }, 300);
        }
    }, 500);
    
    // Event listeners para scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
    
    // Setup form validation
    setupFormValidation();
    
    // Highlight active page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Efecto hover mejorado para la navegación
    document.querySelectorAll('.nav-links a, .page-nav a').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Efecto de neón en el logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 0 15px #00f0ff, 0 0 30px #00f0ff';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.textShadow = '0 0 8px rgba(0, 240, 255, 0.5)';
        });
    }
    
    // Añadir canvas de partículas si no existe
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
        new Particles();
    }
});
