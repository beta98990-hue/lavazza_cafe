  const revealElements = document.querySelectorAll('.reveal');
        
        const revealOnScroll = () => {
            revealElements.forEach(el => {
                const windowHeight = window.innerHeight;
                const elementTop = el.getBoundingClientRect().top;
                const revealPoint = 100;
                
                if (elementTop < windowHeight - revealPoint) {
                    el.classList.add('active');
                }
            });
        };
        
        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll();

        // ===== MENU FILTER =====
        function filterMenu(category, btn) {
            // Update active button
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Show/hide sections
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => {
                if (category === 'all') {
                    section.style.display = 'block';
                    section.classList.add('active');
                    setTimeout(() => {
                        section.style.opacity = '1';
                        section.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    const sectionCategory = section.getAttribute('data-category');
                    if (sectionCategory === category) {
                        section.style.display = 'block';
                        section.classList.add('active');
                        setTimeout(() => {
                            section.style.opacity = '1';
                            section.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        section.style.opacity = '0';
                        section.style.transform = 'translateY(30px)';
                        setTimeout(() => {
                            section.style.display = 'none';
                        }, 300);
                    }
                }
            });
            
            // Scroll to menu section
            document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
            setTimeout(revealOnScroll, 100);
        }

        // ===== SMOOTH SCROLL FOR NAV =====
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // ===== NAV BACKGROUND ON SCROLL =====
        const nav = document.querySelector('.nav-container');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.style.boxShadow = '0 5px 30px rgba(0,0,0,0.3)';
            } else {
                nav.style.boxShadow = 'none';
            }
        });