// Countdown Timer
function updateCountdown() {
    const weddingDate = new Date('2025-11-22T21:45:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    } else {
        // Wedding day has arrived or passed
        document.getElementById('countdown').innerHTML = '<p class="wedding-arrived">🎉 The Big Day is Here! 🎉</p>';
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with fade-in-up class
document.querySelectorAll('.fade-in-up').forEach(element => {
    observer.observe(element);
});

// Particle/Bubble Effect
function createParticles() {
    const container = document.getElementById('particles-container');
    const colors = ['#ffc8dd', '#e7c6ff', '#c8f2dc', '#d4af37'];
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        createParticle(container, colors);
    }

    // Create new particles periodically
    setInterval(() => {
        createParticle(container, colors);
    }, 3000);
}

function createParticle(container, colors) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 40 + 15;
    const startX = Math.random() * window.innerWidth;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const duration = Math.random() * 8 + 8;
    const delay = Math.random() * 3;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${startX}px`;
    particle.style.background = `radial-gradient(circle, ${color}, transparent)`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.boxShadow = `0 0 ${size}px ${color}`;
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        particle.remove();
    }, (duration + delay) * 1000);
}

// Interactive mouse move effect for hero section - Parallax
const hero = document.querySelector('.hero');
const heroBackground = document.querySelector('.hero-background');
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 30;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 30;
    }
});

function animate() {
    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;
    
    if (heroBackground) {
        heroBackground.style.transform = `translate(${currentX}px, ${currentY}px) scale(1.1)`;
    }
    
    requestAnimationFrame(animate);
}

// Parallax scroll effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px) scale(1.1)`;
    }
});

// Create confetti effect on page load
function createConfetti() {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Create simple confetti elements
    const confettiContainer = document.createElement('div');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '9999';
    document.body.appendChild(confettiContainer);

    const colors = ['#ffc8dd', '#e7c6ff', '#c8f2dc', '#d4af37', '#ffb3ba'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.opacity = '0';
        confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.animation = `confetti-fall ${2 + Math.random() * 2}s ease-out forwards`;
        confettiContainer.appendChild(confetti);
    }

    setTimeout(() => {
        confettiContainer.remove();
    }, duration);
}

// Add confetti animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes confetti-fall {
        0% {
            top: -10px;
            opacity: 1;
        }
        100% {
            top: 100vh;
            opacity: 0;
            transform: translateX(${Math.random() * 200 - 100}px) rotate(${Math.random() * 720}deg);
        }
    }
`;
document.head.appendChild(style);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    animate();
    
    // Create confetti after a short delay
    setTimeout(() => {
        createConfetti();
    }, 500);
});

// Add resize handler for responsive particle count
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Clear and recreate particles on significant resize
        const container = document.getElementById('particles-container');
        container.innerHTML = '';
        createParticles();
    }, 250);
});

// Lazy loading for images (when you add real photos)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
});

// Add active class styling
const activeStyle = document.createElement('style');
activeStyle.textContent = `
    .nav-link.active {
        color: var(--primary-color);
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(activeStyle);

// Randomize heart animations
function randomizeHearts() {
    const hearts = document.querySelectorAll('.heart');
    hearts.forEach((heart, index) => {
        // Random horizontal movement
        const randomX = (Math.random() - 0.5) * 100; // -50px to 50px
        heart.style.setProperty('--random-x', `${randomX}px`);
        
        // Random starting position variation
        const randomLeft = Math.random() * 100;
        heart.style.left = `${randomLeft}%`;
        
        // Random size
        const randomSize = 1.5 + Math.random() * 1; // 1.5rem to 2.5rem
        heart.style.fontSize = `${randomSize}rem`;
        
        // Random duration
        const randomDuration = 10 + Math.random() * 5; // 10s to 15s
        heart.style.animationDuration = `${randomDuration}s`;
        
        // Random delay
        const randomDelay = Math.random() * 8; // 0s to 8s
        heart.style.animationDelay = `${randomDelay}s`;
        
        // Random opacity variation
        const randomOpacity = 0.6 + Math.random() * 0.3; // 0.6 to 0.9
        heart.style.setProperty('--max-opacity', randomOpacity);
    });
}

// Initialize random hearts on load
randomizeHearts();

// Re-randomize hearts every 20 seconds for variety
setInterval(randomizeHearts, 20000);
