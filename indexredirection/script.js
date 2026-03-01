// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Button click handlers
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function() {
        // Add ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

// Observe cards and items
document.querySelectorAll('.feature-card, .code-card, .detail-item').forEach(el => {
    el.classList.add('scroll-animate');
    observer.observe(el);
});

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    .scroll-animate {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .scroll-animate.in-view {
        opacity: 1;
        transform: translateY(0);
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.borderBottomColor = 'rgba(30, 144, 255, 0.2)';
    } else {
        navbar.style.borderBottomColor = '#1a1a1a';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Mobile menu toggle (if needed)
function initMobileMenu() {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        // Mobile-specific initialization
    }
}

window.addEventListener('load', initMobileMenu);
window.addEventListener('resize', initMobileMenu);

// Console Easter Egg
console.log('%c🚀 Welcome to iCodeWin!', 'color: #1e90ff; font-size: 16px; font-weight: bold;');
console.log('%cBuild iOS Apps on Windows - Powered by ShadowHex', 'color: #1e90ff; font-size: 12px;');
