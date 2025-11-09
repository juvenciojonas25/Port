// Basic interactive JS (accessible + progressive enhancement)
document.addEventListener('DOMContentLoaded', () => {
    // theme toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const html = document.documentElement;
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || (!saved && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
    themeToggle.addEventListener('click', () => {
        html.classList.toggle('dark');
        const active = html.classList.contains('dark');
        localStorage.setItem('theme', active ? 'dark' : 'light');
        themeIcon.className = active ? 'fas fa-sun' : 'fas fa-moon';
    });

    // mobile menu
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    mobileToggle.addEventListener('click', () => {
        const open = mobileMenu.classList.toggle('hidden');
        mobileToggle.setAttribute('aria-expanded', String(!open));
    });

    // reveal on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

    // skill bars
    document.querySelectorAll('.skill-fill').forEach(el => {
        const w = el.getAttribute('data-width') || 70;
        setTimeout(() => el.style.width = w + '%', 600);
    });

    // contact form (fake submit for demo)
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        btn.disabled = true; btn.textContent = 'Enviando...';
        setTimeout(() => { btn.disabled = false; btn.textContent = 'Enviar Mensagem'; alert('Mensagem enviada (demo) — implementa um endpoint real para produção.'); }, 1100);
    });

    // copy email
    const copyBtn = document.getElementById('copyEmail');
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText('juvencio@example.com').then(() => {
            copyBtn.textContent = 'Email copiado!';
            setTimeout(() => copyBtn.textContent = 'juvencio@example.com', 1500);
        });
    });

    // back to top
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) backToTop.classList.add('show'); else backToTop.classList.remove('show');
    });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // set year
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // particles (lightweight config)
    if (window.particlesJS) {
        particlesJS('particles-js', {
            particles: { number: { value: 50 }, color: { value: '#6366f1' }, shape: { type: 'circle' }, opacity: { value: 0.25 }, size: { value: 3 }, line_linked: { enable: true, distance: 150, color: '#6366f1', opacity: 0.12, width: 1 }, move: { enable: true, speed: 2 } },
            interactivity: { events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } }, modes: { repulse: { distance: 80 } } }, retina_detect: true
        });
    }

});
