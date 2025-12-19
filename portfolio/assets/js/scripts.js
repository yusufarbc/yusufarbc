// Intersection Observer for Fade-in Animations
document.addEventListener('DOMContentLoaded', () => {

    // Select all sections and cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply to main sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-10');
        observer.observe(section);
    });

    // Apply to individual cards for staggered effect
    document.querySelectorAll('.glass-card').forEach((card, index) => {
        card.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-10');
        // Add slight delay based on index (logic simplified for general use)
        setTimeout(() => {
            observer.observe(card);
        }, 100);
    });

    // Navbar scroll effect
    const navbar = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg', 'bg-slate-950/80');
            navbar.classList.remove('border-white/5');
            navbar.classList.add('border-brand-500/20');
        } else {
            navbar.classList.remove('shadow-lg', 'bg-slate-950/80', 'border-brand-500/20');
            navbar.classList.add('border-white/5');
        }
    });

    // Mouse Glow Effect
    const mouseGlow = document.getElementById('mouse-glow');
    if (mouseGlow) {
        document.addEventListener('mousemove', (e) => {
            mouseGlow.style.left = e.clientX + 'px';
            mouseGlow.style.top = e.clientY + 'px';
        });
    }

    // Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            if (isHidden) {
                // Open
                mobileMenu.classList.remove('hidden');
                setTimeout(() => {
                    mobileMenu.classList.remove('scale-y-0', 'opacity-0');
                    mobileMenu.classList.add('scale-y-100', 'opacity-100');
                }, 10);
            } else {
                // Close
                mobileMenu.classList.remove('scale-y-100', 'opacity-100');
                mobileMenu.classList.add('scale-y-0', 'opacity-0');
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300);
            }
        });

        // Close menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('scale-y-100', 'opacity-100');
                mobileMenu.classList.add('scale-y-0', 'opacity-0');
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300);
            });
        });
    }

    console.log("Premium animations initialized.");
});