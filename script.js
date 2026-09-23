/* =========================
   LEARNFUND — SHARED SCRIPT
========================= */

/* AOS */
if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 700, once: true, offset: 80 });
}

/* =========================
   THEME
========================= */
(function () {
    let currentTheme = localStorage.getItem('learnfund-theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    const themeBtn = document.getElementById('theme');
    if (!themeBtn) return;

    const setIcon = (t) => {
        themeBtn.innerHTML = t === 'dark'
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';
    };
    setIcon(currentTheme);

    themeBtn.addEventListener('click', () => {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        setIcon(currentTheme);
        localStorage.setItem('learnfund-theme', currentTheme);
    });
})();

/* =========================
   MOBILE MENU
========================= */
(function () {
    const btn = document.getElementById('mobileMenuBtn');
    const overlay = document.getElementById('mobileMenuOverlay');
    const menu = document.getElementById('mobileMenu');
    const close = document.getElementById('mobileMenuClose');
    if (!btn || !menu) return;

    const openMenu = () => {
        menu.classList.add('active');
        if (overlay) overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    };
    const closeMenu = () => {
        menu.classList.remove('active');
        if (overlay) overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    btn.addEventListener('click', openMenu);
    if (close) close.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);
})();

/* =========================
   MODAL (generic — elements with .open-modal)
========================= */
(function () {
    const modal = document.getElementById('apply-modal');
    if (!modal) return;

    const modalClose = document.getElementById('modalClose');

    document.querySelectorAll('.open-modal').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    if (modalClose) modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', e => {
        if (e.target === modal) closeModal();
    });

    window.__lfCloseModal = closeModal;
})();

/* =========================
   TOAST
========================= */
window.showToast = function (message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
};

/* =========================
   APPLICATION FORM (modal)
========================= */
(function () {
    const form = document.getElementById('applicationForm');
    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();
        window.showToast('Thank you. Your pilot interest has been recorded.');
        if (window.__lfCloseModal) window.__lfCloseModal();
        form.reset();
        const inst = document.getElementById('institution');
        if (inst) inst.value = 'UDSM UCC';
    });
})();

/* =========================
   HOME INLINE FORM
========================= */
(function () {
    const form = document.getElementById('homeInterestForm');
    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();
        window.showToast('Thank you. Your interest has been recorded.');
        form.reset();
        const inst = document.getElementById('homeInstitution');
        if (inst) inst.value = 'UDSM UCC';
    });
})();

/* =========================
   SCROLL TO TOP
========================= */
(function () {
    const btn = document.getElementById('scrollToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.style.display = window.scrollY > 300 ? 'flex' : 'none';
    });
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

/* =========================
   SMOOTH SCROLL (same-page anchors only)
========================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#apply-modal') return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        const headerHeight = document.querySelector('header')?.offsetHeight || 0;
        window.scrollTo({
            top: target.offsetTop - headerHeight - 10,
            behavior: 'smooth'
        });
    });
});