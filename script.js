document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // Smooth Scrolling for Navigation Links
    // ============================================
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close nav if open on mobile
                const navMenu = document.querySelector('nav');
                if (navMenu) {
                    navMenu.classList.remove('active');
                }

                // Smooth scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Add active state to nav link
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // ============================================
    // Intersection Observer for Fade-In Animations
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all project cards and sections
    document.querySelectorAll('.project, section').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // ============================================
    // Active Navigation Link on Scroll
    // ============================================
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // ============================================
    // Parallax Effect on Header (Subtle)
    // ============================================
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            const scrollY = window.pageYOffset;
            if (scrollY < 500) {
                header.style.backgroundPosition = `0 ${scrollY * 0.5}px`;
            }
        });
    }

    // ============================================
    // Ripple Effect on Buttons and Links
    // ============================================
    document.querySelectorAll('.project a, .link-card').forEach(element => {
        element.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

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

    // ============================================
    // Keyboard Navigation Support
    // ============================================
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open elements if needed
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
            });
        }
    });

    // ============================================
    // Performance Monitoring
    // ============================================
    if (window.performance && window.performance.timing) {
        window.addEventListener('load', function() {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('Portfolio loaded in ' + pageLoadTime + 'ms');
        });
    }

    // ============================================
    // Initialization Log
    // ============================================
    console.log('🚀 Portfolio site loaded successfully!');
    console.log('📱 Responsive design active');
    console.log('⚡ Smooth animations enabled');
});

// ============================================
// Utility: Debounce Function for Scroll Events
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// Utility: Check if Element is in Viewport
// ============================================
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

