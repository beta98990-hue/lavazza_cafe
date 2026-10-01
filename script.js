// ===== PERFORMANCE OPTIMIZED SCROLL ANIMATION =====
const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.05,
        rootMargin: '0px 0px 50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
} else {
    // Fallback for older browsers
    let ticking = false;
    const revealOnScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                revealElements.forEach(el => {
                    const windowHeight = window.innerHeight;
                    const elementTop = el.getBoundingClientRect().top;
                    if (elementTop < windowHeight - 80) {
                        el.classList.add('active');
                    }
                });
                ticking = false;
            });
            ticking = true;
        }
    };
    window.addEventListener('scroll', revealOnScroll, { passive: true });
    revealOnScroll();
}

// ===== MENU FILTER =====
function filterMenu(category, btn) {
    // Update active button
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Show/hide sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const isMatch = category === 'all' || section.getAttribute('data-category') === category;
        if (isMatch) {
            section.style.display = 'block';
            section.classList.add('active');
            requestAnimationFrame(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            });
            // Agar bo'lim ko'rinishi ochilsa, undagi rasmlar tezroq yuklanadi
            const sectionImgs = section.querySelectorAll('img[loading="lazy"]');
            sectionImgs.forEach(img => {
                img.decoding = 'async';
            });
        } else {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            setTimeout(() => {
                section.style.display = 'none';
            }, 250);
        }
    });
    
    // Scroll to menu section
    document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
}

// ===== SMOOTH SCROLL FOR NAV =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== HIGH-PERFORMANCE NAV BACKGROUND ON SCROLL =====
const nav = document.querySelector('.nav-container');
let navTicking = false;

window.addEventListener('scroll', () => {
    if (!navTicking) {
        window.requestAnimationFrame(() => {
            if (window.scrollY > 100) {
                nav.style.boxShadow = '0 5px 30px rgba(0,0,0,0.3)';
            } else {
                nav.style.boxShadow = 'none';
            }
            navTicking = false;
        });
        navTicking = true;
    }
}, { passive: true });