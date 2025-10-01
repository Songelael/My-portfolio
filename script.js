document.addEventListener('DOMContentLoaded', () => {

    // --- MOBILE MENU TOGGLE ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu-button') ? document.getElementById('mobile-menu') : null;

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- SMOOTH SCROLLING ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetEl = document.querySelector(this.getAttribute('href'));
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
            // Close mobile menu after click
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // --- SCROLL REVEAL ---
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // --- COUNTER ANIMATION ---
    const counters = document.querySelectorAll('[data-target]');
    const counterSpeed = 200; // lower = slower

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText.replace('%','');
        const increment = target / counterSpeed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment) + (counter.innerText.includes('%') ? '%' : '');
            setTimeout(() => animateCounter(counter), 10);
        } else {
            counter.innerText = target + (counter.innerText.includes('%') ? '%' : '');
        }
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => animateCounter(counter));
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const impactSection = document.getElementById('impact');
    if (impactSection) counterObserver.observe(impactSection);

    // --- APPLICATION FORM SUBMISSION ---
    const form = document.getElementById('application-form');
    const successMessage = document.getElementById('form-success-message');

    if (form && successMessage) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            form.style.display = 'none';
            successMessage.classList.remove('hidden');
        });
    }

    // --- DYNAMIC YEAR IN FOOTER ---
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();

    // --- MARQUEE LOOP (DOUBLE CONTENT) ---
    const marquee = document.querySelector('.marquee-content');
    if (marquee) {
        marquee.innerHTML += marquee.innerHTML; // duplicate for smooth loop
    }
});
