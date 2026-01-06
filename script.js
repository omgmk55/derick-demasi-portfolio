// ===========================
// NAVIGATION
// ===========================

const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

// Scroll effect for navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (menuToggle) menuToggle.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
    });
});

// ===========================
// ACTIVE LINK HIGHLIGHTING (Multi-Page)
// ===========================

function setActiveLink() {
    const currentPath = window.location.pathname;
    const pageName = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        link.classList.remove('active');

        if (linkHref === pageName) {
            link.classList.add('active');
        } else if (pageName === 'index.html' && linkHref === 'index.html') {
            // Default to home active if root
            link.classList.add('active');
        }
    });
}
// Run on load
document.addEventListener('DOMContentLoaded', setActiveLink);


// ===========================
// SCROLL ANIMATIONS (Fade In)
// ===========================

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

// Observe all sections and cards
const animatedElements = document.querySelectorAll(
    '.section-header, .service-card, .portfolio-item, .about-content, .contact-content, .info-card'
);

animatedElements.forEach(element => {
    element.classList.add('fade-in');
    observer.observe(element);
});


// ===========================
// PORTFOLIO INTERACTION (Portfolio Page)
// ===========================

const portfolioItems = document.querySelectorAll('.portfolio-item');
if (portfolioItems.length > 0) {
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            // Add click animation
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
                item.style.transform = '';
            }, 200);
            console.log('Portfolio item clicked');
        });
    });
}

// ===========================
// HOME PAGE: STATS ANIMATION
// ===========================

const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    const statsNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated) return;
        const statsPosition = statsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;

        if (statsPosition < screenPosition) {
            statsAnimated = true;
            statsNumbers.forEach(stat => {
                const text = stat.textContent;
                const target = parseInt(text);
                const suffix = text.replace(/[0-9]/g, '');
                let current = 0;
                // Avoid division by zero or weird loops
                const increment = target > 0 ? target / 50 : 1;

                const updateCounter = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = target + suffix;
                        clearInterval(updateCounter);
                    } else {
                        stat.textContent = Math.floor(current) + suffix;
                    }
                }, 30);
            });
        }
    }
    window.addEventListener('scroll', animateStats);
}


// ===========================
// CONTACT PAGE: FORM & QR CODE
// ===========================

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    // Form Validation Styles
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');
    formInputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value.trim() === '' && input.hasAttribute('required')) {
                input.style.borderColor = '#ef4444';
            } else {
                input.style.borderColor = '';
            }
        });
        input.addEventListener('focus', () => {
            input.style.borderColor = '#6366f1';
        });
    });

    // Form Submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        console.log('Form submitted:', formData);
        alert('Merci pour votre message ! Je vous répondrai dans les plus brefs délais.');
        contactForm.reset();
    });
}

// QR Code
const qrContainer = document.getElementById('qrcode');
if (qrContainer) {
    // Public URL from Localtunnel
    const mobileUrl = "https://flat-impalas-grin.loca.lt";

    // Generate QR Code
    setTimeout(() => {
        if (typeof QRCode !== 'undefined') {
            try {
                qrContainer.innerHTML = '';
                new QRCode(qrContainer, {
                    text: mobileUrl,
                    width: 128,
                    height: 128,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.H
                });
                console.log(`QR Code generated for: ${mobileUrl}`);
            } catch (e) {
                console.error("QR Code generation failed:", e);
                qrContainer.innerHTML = 'Erreur QR';
            }
        } else {
            qrContainer.innerHTML = '<p>QR Lib missing</p>';
        }
    }, 1000);
}


// ===========================
// LOADING & FOOTER
// ===========================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Year Auto-update
const currentYear = new Date().getFullYear();
const yearElements = document.querySelectorAll('.footer-bottom p');
yearElements.forEach(element => {
    if (element.textContent.includes('2024')) {
        element.textContent = element.textContent.replace('2024', currentYear);
    }
});

console.log('🎨 Derick Demasi Portfolio - Multi-page structure initialized!');
