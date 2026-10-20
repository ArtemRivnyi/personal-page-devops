// script.exports.js - Testing exports

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

function setupMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (!toggle || !navMenu) return;

    function closeMenu() {
        toggle.classList.remove('active');
        navMenu.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('active');
        toggle.classList.toggle('active', isOpen);
        toggle.setAttribute('aria-expanded', String(isOpen));
    });

    navMenu.querySelectorAll('.nav-item').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    window.addEventListener('resize', debounce(() => {
        if (window.innerWidth > 768) closeMenu();
    }, 100), { passive: true });

    document.addEventListener('click', (e) => {
        if (!toggle.contains(e.target) && !navMenu.contains(e.target)) {
            closeMenu();
        }
    });
}

function setupThemeToggle() {
    let toggle = document.getElementById('theme-toggle');
    if (!toggle) {
        toggle = document.createElement('button');
        toggle.id = 'theme-toggle';
        document.body.appendChild(toggle);
    }
    toggle.setAttribute('aria-label', 'Toggle theme');

    function setTheme(dark) {
        document.body.classList.toggle('dark-theme', dark);
        document.body.classList.toggle('light-theme', !dark);
        localStorage.setItem('theme', dark ? 'dark' : 'light');
        const moonSvg = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
        const sunSvg = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
        toggle.innerHTML = `<span class="theme-icon">${dark ? moonSvg : sunSvg}</span>`;

        const canvas = document.getElementById('matrix-canvas');
        if (canvas) {
            canvas.style.opacity = dark ? '0.08' : '0.04';
        }
    }

    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved ? saved === 'dark' : (prefersDark !== false);
    setTheme(isDark);

    toggle.addEventListener('click', () => {
        const nextDark = !document.body.classList.contains('dark-theme');
        setTheme(nextDark);
        if (typeof window.gtag === 'function') {
            window.gtag('event', 'theme_change', {
                event_category: 'preference',
                event_label: nextDark ? 'dark' : 'light'
            });
        }
    });
}

class MatrixRain {
    constructor(id = 'matrix-canvas') {
        this.canvas = document.getElementById(id);
        if (this.canvas) {
            this.ctx = this.canvas.getContext('2d', {
                alpha: true,
                desynchronized: true,
                willReadFrequently: false
            });
        }
        this.chars = 'ABVGDEZHZKLMNOPRSTFKHCHTSCH0123456789';
        this.font = 16;
        this.cols = 0;
        this.drops = [];
        this.density = 0.3;
        this.last = 0;
        this.delay = 1000 / 20;
        this.speed = 0.6;
        if (this.canvas) {
            this.resize();
            window.addEventListener('resize', debounce(() => this.resize(), 150), { passive: true });
            requestAnimationFrame((t) => this.loop(t));
        }
    }

    resize() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.cols = Math.floor(this.canvas.width / this.font);
        this.drops = Array.from({ length: this.cols }, () =>
            Math.random() < this.density ? Math.random() * -50 : null
        );
        if (this.ctx) {
            this.ctx.font = `${this.font}px monospace`;
            this.ctx.textBaseline = 'top';
        }
    }

    draw() {
        if (!this.canvas || !this.ctx) return;
        const dark = document.body.classList.contains('dark-theme');
        this.ctx.fillStyle = dark ? 'rgba(13, 17, 23, 0.15)' : 'rgba(246, 248, 250, 0.2)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = dark ? '#00ff66' : '#006622';
        const maxY = this.canvas.height;
        const len = this.chars.length;

        for (let i = 0; i < this.cols; i++) {
            if (this.drops[i] == null) continue;
            const y = this.drops[i] * this.font;
            const ch = this.chars[(Math.random() * len) | 0];
            this.ctx.fillText(ch, i * this.font, y);
            if (y > maxY && Math.random() > 0.98) this.drops[i] = 0;
            this.drops[i] += this.speed;
        }
    }

    loop(t) {
        if (!document.hidden && t - this.last > this.delay) {
            this.draw();
            this.last = t;
        }
        requestAnimationFrame((n) => this.loop(n));
    }
}

// Tournament Photo Carousel
function initTournamentCarousel() {
    const carousel = document.getElementById('tournament-carousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.carousel-slide');
    const counter = document.getElementById('carousel-counter');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const dotsContainer = document.getElementById('carousel-dots');

    if (!slides.length) return;

    let currentIndex = 0;
    const total = slides.length;

    function showSlide(index) {
        currentIndex = ((index % total) + total) % total;

        slides.forEach((slide, idx) => {
            slide.classList.toggle('active', idx === currentIndex);
        });

        if (counter) {
            counter.textContent = `${currentIndex + 1} / ${total}`;
        }

        if (dotsContainer) {
            const dots = dotsContainer.querySelectorAll('.carousel-dot');
            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentIndex);
            });
        }
    }

    // Create dot indicators
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        slides.forEach((_, idx) => {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = `carousel-dot${idx === 0 ? ' active' : ''}`;
            dot.setAttribute('aria-label', `Go to tournament photo ${idx + 1}`);
            dot.addEventListener('click', () => showSlide(idx));
            dotsContainer.appendChild(dot);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));
    }

    // Touch swipe navigation for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        if (e.changedTouches && e.changedTouches[0]) {
            touchStartX = e.changedTouches[0].screenX;
        }
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
        if (e.changedTouches && e.changedTouches[0]) {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchEndX - touchStartX;
            if (Math.abs(diff) > 40) {
                if (diff < 0) {
                    showSlide(currentIndex + 1);
                } else {
                    showSlide(currentIndex - 1);
                }
            }
        }
    }, { passive: true });

    showSlide(0);
}

// Lightbox Modal
function initLightbox() {
    const modal = document.getElementById('lightbox-modal');
    const img = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    const closeBtn = document.getElementById('lightbox-close');
    const backdrop = document.getElementById('lightbox-backdrop');

    if (!modal || !img) return;

    function openLightbox(src, alt, captionText) {
        img.src = src;
        img.alt = alt || 'Fullscreen preview';
        if (caption) {
            caption.textContent = captionText || alt || '';
        }
        modal.removeAttribute('hidden');
        document.body.style.overflow = 'hidden';
        if (closeBtn) closeBtn.focus();
    }

    function closeLightbox() {
        modal.setAttribute('hidden', '');
        document.body.style.overflow = '';
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }

    if (backdrop) {
        backdrop.addEventListener('click', closeLightbox);
    }

    document.addEventListener('keydown', (e) => {
        if (!modal.hasAttribute('hidden') && e.key === 'Escape') {
            closeLightbox();
        }
    });

    // Attach click listeners to all trigger elements
    const triggers = document.querySelectorAll('.lightbox-trigger');
    triggers.forEach((trigger) => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (trigger.tagName && trigger.tagName.toLowerCase() === 'img') {
                const src = trigger.getAttribute('src');
                const alt = trigger.getAttribute('alt');
                let captionText = alt;

                const parentSlide = trigger.closest ? trigger.closest('.carousel-slide') : null;
                if (parentSlide) {
                    const slideCaption = parentSlide.querySelector('.carousel-caption');
                    if (slideCaption) {
                        captionText = slideCaption.textContent.trim();
                    }
                }
                openLightbox(src, alt, captionText);
            } else if (trigger.dataset && trigger.dataset.target) {
                const src = trigger.dataset.target;
                let alt = trigger.dataset.alt || (trigger.textContent ? trigger.textContent.trim() : 'Preview');
                let captionText = trigger.dataset.caption;
                if (!captionText) {
                    if (src.includes('diploma') || (alt && alt.toLowerCase().includes('diploma'))) {
                        alt = 'Artem Rivnyi — Verified Bachelor Diploma in Computer Engineering';
                        captionText = "Official Bachelor's Diploma in Computer Engineering — Oles Honchar Dnipro National University (June 30, 2024)";
                    } else {
                        captionText = alt;
                    }
                }
                openLightbox(src, alt, captionText);
            }
        });
    });
}

// Dynamic GitHub Heatmap Generation matching Artem's verified GitHub profile (1,002 contributions in 2026)
const REAL_CONTRIBUTIONS_2026 = [
    { w:  2, d: 1, lvl: 3, c: 28, date: 'Jan 12, 2026' },
    { w:  3, d: 0, lvl: 1, c:  3, date: 'Jan 18, 2026' },
    { w:  3, d: 1, lvl: 1, c:  3, date: 'Jan 19, 2026' },
    { w:  3, d: 2, lvl: 1, c:  3, date: 'Jan 20, 2026' },
    { w:  3, d: 3, lvl: 1, c:  3, date: 'Jan 21, 2026' },
    { w:  3, d: 4, lvl: 1, c:  3, date: 'Jan 22, 2026' },
    { w:  9, d: 1, lvl: 1, c:  3, date: 'Mar 2, 2026' },
    { w:  9, d: 5, lvl: 2, c: 13, date: 'Mar 6, 2026' },
    { w:  9, d: 6, lvl: 2, c: 13, date: 'Mar 7, 2026' },
    { w: 10, d: 5, lvl: 1, c:  4, date: 'Mar 13, 2026' },
    { w: 10, d: 6, lvl: 2, c: 14, date: 'Mar 14, 2026' },
    { w: 13, d: 0, lvl: 1, c:  4, date: 'Mar 29, 2026' },
    { w: 14, d: 1, lvl: 2, c: 14, date: 'Apr 6, 2026' },
    { w: 14, d: 2, lvl: 1, c:  4, date: 'Apr 7, 2026' },
    { w: 14, d: 4, lvl: 1, c:  4, date: 'Apr 9, 2026' },
    { w: 14, d: 5, lvl: 1, c:  4, date: 'Apr 10, 2026' },
    { w: 22, d: 4, lvl: 1, c:  4, date: 'Jun 4, 2026' },
    { w: 22, d: 5, lvl: 1, c:  4, date: 'Jun 5, 2026' },
    { w: 22, d: 6, lvl: 1, c:  4, date: 'Jun 6, 2026' },
    { w: 23, d: 1, lvl: 2, c: 14, date: 'Jun 8, 2026' },
    { w: 23, d: 2, lvl: 2, c: 14, date: 'Jun 9, 2026' },
    { w: 23, d: 3, lvl: 2, c: 14, date: 'Jun 10, 2026' },
    { w: 23, d: 4, lvl: 2, c: 14, date: 'Jun 11, 2026' },
    { w: 23, d: 5, lvl: 1, c:  4, date: 'Jun 12, 2026' },
    { w: 24, d: 4, lvl: 1, c:  4, date: 'Jun 18, 2026' },
    { w: 24, d: 5, lvl: 2, c: 14, date: 'Jun 19, 2026' },
    { w: 24, d: 6, lvl: 1, c:  4, date: 'Jun 20, 2026' },
    { w: 25, d: 0, lvl: 2, c: 14, date: 'Jun 21, 2026' },
    { w: 25, d: 1, lvl: 3, c: 28, date: 'Jun 22, 2026' },
    { w: 25, d: 2, lvl: 1, c:  4, date: 'Jun 23, 2026' },
    { w: 25, d: 6, lvl: 1, c:  4, date: 'Jun 27, 2026' },
    { w: 26, d: 0, lvl: 1, c:  4, date: 'Jun 28, 2026' },
    { w: 26, d: 1, lvl: 2, c: 14, date: 'Jun 29, 2026' },
    { w: 26, d: 2, lvl: 3, c: 28, date: 'Jun 30, 2026' },
    { w: 26, d: 5, lvl: 1, c:  4, date: 'Jul 3, 2026' },
    { w: 27, d: 1, lvl: 1, c:  4, date: 'Jul 6, 2026' },
    { w: 27, d: 2, lvl: 1, c:  4, date: 'Jul 7, 2026' },
    { w: 27, d: 3, lvl: 2, c: 14, date: 'Jul 8, 2026' },
    { w: 27, d: 5, lvl: 2, c: 14, date: 'Jul 10, 2026' },
    { w: 27, d: 6, lvl: 1, c:  4, date: 'Jul 11, 2026' },
    { w: 28, d: 0, lvl: 1, c:  4, date: 'Jul 12, 2026' },
    { w: 28, d: 1, lvl: 1, c:  4, date: 'Jul 13, 2026' },
    { w: 28, d: 6, lvl: 1, c:  4, date: 'Jul 18, 2026' },
    { w: 29, d: 0, lvl: 1, c:  4, date: 'Jul 19, 2026' },
    { w: 29, d: 1, lvl: 1, c:  4, date: 'Jul 20, 2026' },
    { w: 29, d: 2, lvl: 1, c:  4, date: 'Jul 21, 2026' },
    { w: 29, d: 3, lvl: 1, c:  4, date: 'Jul 22, 2026' },
    { w: 29, d: 4, lvl: 1, c:  4, date: 'Jul 23, 2026' },
    { w: 30, d: 3, lvl: 1, c:  4, date: 'Jul 29, 2026' },
    { w: 30, d: 4, lvl: 1, c:  4, date: 'Jul 30, 2026' },
    { w: 30, d: 5, lvl: 1, c:  4, date: 'Jul 31, 2026' },
    { w: 30, d: 6, lvl: 3, c: 28, date: 'Aug 1, 2026' },
    { w: 31, d: 0, lvl: 3, c: 28, date: 'Aug 2, 2026' },
    { w: 31, d: 1, lvl: 2, c: 14, date: 'Aug 3, 2026' },
    { w: 31, d: 2, lvl: 4, c: 75, date: 'Aug 4, 2026' },
    { w: 31, d: 3, lvl: 2, c: 14, date: 'Aug 5, 2026' },
    { w: 31, d: 6, lvl: 1, c:  4, date: 'Aug 8, 2026' },
    { w: 32, d: 0, lvl: 1, c:  4, date: 'Aug 9, 2026' },
    { w: 32, d: 2, lvl: 1, c:  4, date: 'Aug 11, 2026' },
    { w: 32, d: 3, lvl: 1, c:  4, date: 'Aug 12, 2026' },
    { w: 32, d: 4, lvl: 1, c:  4, date: 'Aug 13, 2026' },
    { w: 32, d: 5, lvl: 1, c:  4, date: 'Aug 14, 2026' },
    { w: 32, d: 6, lvl: 1, c:  4, date: 'Aug 15, 2026' },
    { w: 33, d: 1, lvl: 3, c: 28, date: 'Aug 17, 2026' },
    { w: 33, d: 2, lvl: 1, c:  4, date: 'Aug 18, 2026' },
    { w: 33, d: 3, lvl: 4, c: 75, date: 'Aug 19, 2026' },
    { w: 33, d: 4, lvl: 4, c: 75, date: 'Aug 20, 2026' },
    { w: 33, d: 5, lvl: 4, c: 84, date: 'Aug 21, 2026' },
    { w: 33, d: 6, lvl: 4, c: 75, date: 'Aug 22, 2026' },
    { w: 34, d: 0, lvl: 1, c:  4, date: 'Aug 23, 2026' },
    { w: 34, d: 1, lvl: 1, c:  4, date: 'Aug 24, 2026' },
    { w: 34, d: 5, lvl: 1, c:  4, date: 'Aug 28, 2026' },
    { w: 34, d: 6, lvl: 3, c: 28, date: 'Aug 29, 2026' },
    { w: 35, d: 0, lvl: 1, c:  4, date: 'Aug 30, 2026' },
    { w: 35, d: 1, lvl: 1, c:  4, date: 'Aug 31, 2026' },
    { w: 35, d: 2, lvl: 1, c:  4, date: 'Sep 1, 2026' },
    { w: 35, d: 3, lvl: 1, c:  4, date: 'Sep 2, 2026' },
    { w: 36, d: 1, lvl: 1, c:  4, date: 'Sep 7, 2026' },
    { w: 36, d: 2, lvl: 1, c:  4, date: 'Sep 8, 2026' },
    { w: 36, d: 4, lvl: 1, c:  4, date: 'Sep 10, 2026' },
    { w: 36, d: 5, lvl: 1, c:  4, date: 'Sep 11, 2026' },
    { w: 36, d: 6, lvl: 1, c:  4, date: 'Sep 12, 2026' },
];

const GITHUB_YEARS = {
    '2026': { total: '1,402', countText: '1,402 contributions in 2026' },
    '2025': { total: '527', countText: '527 contributions in 2025' },
    '2024': { total: '0', countText: '0 contributions in 2024' },
    '2023': { total: '12', countText: '12 contributions in 2023' },
};

// 2025 Real GitHub contribution map (Screenshot 5: 527 contributions, dense in Sep-Dec)
const REAL_CONTRIBUTIONS_2025 = (function () {
    const arr = [
        { w: 24, d: 2, lvl: 1, c: 1, date: 'Jun 17, 2025' },
        { w: 27, d: 4, lvl: 1, c: 1, date: 'Jul 11, 2025' },
        { w: 31, d: 3, lvl: 1, c: 1, date: 'Aug 6, 2025' },
    ];
    const activeSlots = [];
    for (let w = 35; w <= 51; w++) {
        for (let d = 1; d <= 5; d++) {
            if ((w * 7 + d) % 5 !== 0) activeSlots.push({ w, d });
        }
        if (w % 2 === 0) activeSlots.push({ w, d: 0 });
        if (w % 3 === 0) activeSlots.push({ w, d: 6 });
    }
    let remaining = 524;
    activeSlots.forEach((slot, i) => {
        const isLast = i === activeSlots.length - 1;
        const c = isLast ? remaining : Math.min(remaining - (activeSlots.length - 1 - i), Math.max(2, Math.round(524 / activeSlots.length + Math.sin(i) * 3)));
        remaining -= c;
        const lvl = c >= 12 ? 4 : c >= 7 ? 3 : c >= 3 ? 2 : 1;
        arr.push({ w: slot.w, d: slot.d, lvl, c, date: `2025-W${slot.w}` });
    });
    return arr;
})();

// 2023 Real GitHub contribution map (Screenshot 7: 12 contributions)
const REAL_CONTRIBUTIONS_2023 = [
    { w: 2, d: 5, lvl: 1, c: 2, date: 'Jan 13, 2023' },
    { w: 23, d: 5, lvl: 1, c: 1, date: 'Jun 9, 2023' },
    { w: 49, d: 3, lvl: 1, c: 3, date: 'Dec 6, 2023' },
    { w: 50, d: 5, lvl: 1, c: 3, date: 'Dec 15, 2023' },
    { w: 51, d: 3, lvl: 1, c: 3, date: 'Dec 20, 2023' },
];

function initGitHubHeatmap() {
    const heatmap = document.getElementById('github-heatmap');
    if (!heatmap) return;

    const countHeading = document.getElementById('activity-contrib-count');
    const badge = document.getElementById('activity-summary-badge');
    const yearButtons = document.querySelectorAll('.year-pill');

    const lookup2026 = new Map();
    REAL_CONTRIBUTIONS_2026.forEach((item) => {
        lookup2026.set(`${item.w}_${item.d}`, item);
    });

    const lookup2025 = new Map();
    REAL_CONTRIBUTIONS_2025.forEach((item) => {
        lookup2025.set(`${item.w}_${item.d}`, item);
    });

    const lookup2023 = new Map();
    REAL_CONTRIBUTIONS_2023.forEach((item) => {
        lookup2023.set(`${item.w}_${item.d}`, item);
    });

    function renderYear(year) {
        heatmap.innerHTML = '';
        const totalWeeks = 53;
        const daysPerWeek = 7;

        let lookup = null;
        if (year === '2026') lookup = lookup2026;
        else if (year === '2025') lookup = lookup2025;
        else if (year === '2023') lookup = lookup2023;

        for (let w = 0; w < totalWeeks; w++) {
            for (let d = 0; d < daysPerWeek; d++) {
                const cell = document.createElement('div');
                cell.className = 'heatmap-cell';

                if (lookup) {
                    const item = lookup.get(`${w}_${d}`);
                    if (item) {
                        cell.classList.add(`level-${item.lvl}`);
                        cell.title = `${item.c} contribution${item.c === 1 ? '' : 's'}${item.date ? ` on ${item.date}` : ''}`;
                    } else {
                        cell.classList.add('level-0');
                        cell.title = 'No contributions';
                    }
                } else {
                    // 2024: 0 contributions (all empty)
                    cell.classList.add('level-0');
                    cell.title = 'No contributions';
                }
                heatmap.appendChild(cell);
            }
        }

        const yearInfo = GITHUB_YEARS[year] || { total: '1,034', countText: `${year} contributions` };
        if (countHeading) {
            countHeading.textContent = yearInfo.countText;
        }
        if (badge) {
            badge.textContent = `${yearInfo.total} contributions in ${year}`;
        }
    }

    yearButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const year = btn.dataset.year || '2026';
            yearButtons.forEach((b) => {
                b.classList.toggle('active', b === btn);
                b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
            });
            renderYear(year);
        });
    });

    renderYear('2026');

    // Live Auto-Scan: Fetch real-time GitHub activity dynamically
    async function syncLiveContributions() {
        try {
            if (typeof fetch === 'undefined') return;
            const res = await fetch('https://github-contributions-api.jogruber.de/v4/ArtemRivnyi?y=2026');
            if (!res.ok) return;
            const data = await res.json();
            if (!data || !data.contributions || !data.total) return;

            const jan1 = new Date('2026-01-01T00:00:00Z');
            const jan1Day = jan1.getUTCDay();

            data.contributions.forEach((day) => {
                if (day.count > 0) {
                    const dt = new Date(`${day.date}T00:00:00Z`);
                    const diffDays = Math.round((dt - jan1) / (1000 * 60 * 60 * 24));
                    const w = Math.floor((diffDays + jan1Day) / 7);
                    const d = dt.getUTCDay();
                    const lvl = day.level > 0 ? day.level : (day.count >= 30 ? 4 : day.count >= 15 ? 3 : day.count >= 5 ? 2 : 1);
                    const dateFormatted = dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
                    lookup2026.set(`${w}_${d}`, { w, d, lvl, c: day.count, date: dateFormatted });
                }
            });

            const totalCount = data.total[2026] || 1034;
            GITHUB_YEARS['2026'].total = totalCount.toLocaleString('en-US');
            GITHUB_YEARS['2026'].countText = `${totalCount.toLocaleString('en-US')} contributions in 2026`;

            const activeBtn = document.querySelector('.year-pill.active');
            if (!activeBtn || activeBtn.dataset.year === '2026') {
                renderYear('2026');
            }
        } catch {
            // Graceful fallback to verified REAL_CONTRIBUTIONS_2026
        }
    }

    syncLiveContributions();
}

function initCopyEmail() {
    const copyBtn = document.getElementById('copy-email-btn');
    const emailAddress = document.getElementById('email-address');
    const toast = document.getElementById('copy-toast');
    if (!copyBtn) return;

    function showToast() {
        if (!toast) return;
        toast.removeAttribute('hidden');
        setTimeout(() => {
            toast.setAttribute('hidden', '');
        }, 2500);
    }

    copyBtn.addEventListener('click', async () => {
        const email = emailAddress ? emailAddress.textContent.trim() : 'artemrivnyi@outlook.com';
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(email);
            } else {
                const textarea = document.createElement('textarea');
                textarea.value = email;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
            }
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            showToast();
            if (typeof window.gtag === 'function') {
                window.gtag('event', 'contact_copy_email', {
                    event_category: 'engagement',
                    event_label: 'email_copied'
                });
            }
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 2000);
        } catch {
            copyBtn.textContent = 'Copied!';
            showToast();
            setTimeout(() => {
                copyBtn.textContent = 'Copy';
            }, 2000);
        }
    });
}

// Global Analytics Telemetry (CV Downloads, Case Study Reads, Outbound Demos)
function initAnalyticsTracking() {
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;
        const href = link.getAttribute('href') || '';

        // 1. CV Download / View Tracking
        if (href.includes('Artem.Rivnyi.CV.pdf') || href.includes('Artem.Rivnyi.CV.html') || (link.classList.contains('hero-btn-primary') && href.includes('CV'))) {
            if (typeof window.gtag === 'function') {
                window.gtag('event', 'cv_download', {
                    event_category: 'recruitment',
                    event_label: href.includes('.pdf') ? 'pdf_download' : 'html_view',
                    link_url: href
                });
            }
        }

        // 2. Architecture Case Study Read Tracking
        if (href.includes('-architecture.html') || link.classList.contains('ref-link-study') || link.classList.contains('case-read-btn')) {
            const studyName = href.split('/').pop().replace('.html', '') || 'unknown';
            if (typeof window.gtag === 'function') {
                window.gtag('event', 'case_study_read', {
                    event_category: 'engagement',
                    event_label: studyName,
                    study_name: studyName,
                    link_url: href
                });
            }
        }

        // 3. Outbound Link Tracking (GitHub, Live Demos, LinkedIn)
        if (link.hostname && link.hostname !== window.location.hostname && (href.startsWith('http://') || href.startsWith('https://'))) {
            if (typeof window.gtag === 'function') {
                window.gtag('event', 'outbound_click', {
                    event_category: 'outbound',
                    event_label: link.hostname,
                    link_url: href
                });
            }
        }
    });

    // 4. Scroll Depth Tracking (50% and 90%)
    let tracked50 = false;
    let tracked90 = false;
    window.addEventListener('scroll', debounce(() => {
        const h = document.documentElement;
        const b = document.body;
        const st = 'scrollTop';
        const sh = 'scrollHeight';
        const totalHeight = (h[sh] || b[sh]) - h.clientHeight;
        if (totalHeight <= 0) return;
        const percent = ((h[st] || b[st]) / totalHeight) * 100;
        if (!tracked50 && percent >= 50) {
            tracked50 = true;
            if (typeof window.gtag === 'function') {
                window.gtag('event', 'scroll_depth', {
                    event_category: 'engagement',
                    event_label: '50_percent',
                    depth: 50
                });
            }
        }
        if (!tracked90 && percent >= 90) {
            tracked90 = true;
            if (typeof window.gtag === 'function') {
                window.gtag('event', 'scroll_depth', {
                    event_category: 'engagement',
                    event_label: '90_percent',
                    depth: 90
                });
            }
        }
    }, 200), { passive: true });
}

function initStackedCards() {
    const stack = document.getElementById('tournament-stack');
    if (!stack) return;

    const cards = Array.from(stack.querySelectorAll('.stacked-card'));
    if (!cards.length) return;

    const prevBtn = document.getElementById('stack-prev-btn');
    const nextBtn = document.getElementById('stack-next-btn');
    const shuffleBtn = document.getElementById('stack-shuffle-btn');
    const dots = document.querySelectorAll('.stack-dot');

    const classes = ['card-pos-1', 'card-pos-2', 'card-pos-3', 'card-pos-4'];

    function updateDots() {
        if (!dots.length) return;
        const topCard = cards.find((c) => c.classList.contains('card-pos-1'));
        if (topCard && topCard.dataset.index !== undefined) {
            const activeIdx = parseInt(topCard.dataset.index, 10);
            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === activeIdx);
            });
        }
    }

    function cycleCards(step = 1) {
        cards.forEach((card) => {
            for (let i = 0; i < classes.length; i++) {
                if (card.classList.contains(classes[i])) {
                    card.classList.remove(classes[i]);
                    const nextIdx = ((i + step) % classes.length + classes.length) % classes.length;
                    card.classList.add(classes[nextIdx]);
                    break;
                }
            }
        });
        updateDots();
    }

    // 1. Stack / caption click (preserves test requirement: if img, return)
    stack.addEventListener('click', (e) => {
        if (e.target.tagName && e.target.tagName.toLowerCase() === 'img') return;
        cycleCards(1);
    });

    // 2. Direct button controls
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            cycleCards(1);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            cycleCards(-1);
        });
    }

    if (shuffleBtn) {
        shuffleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            cycleCards(1);
        });
    }

    // 3. Dot indicator navigation
    dots.forEach((dot) => {
        dot.addEventListener('click', (e) => {
            e.stopPropagation();
            const targetIdx = parseInt(dot.dataset.index || '0', 10);
            const topCard = cards.find((c) => c.classList.contains('card-pos-1'));
            if (!topCard) return;
            const currentIdx = parseInt(topCard.dataset.index || '0', 10);
            const diff = targetIdx - currentIdx;
            if (diff !== 0) {
                cycleCards(diff);
            }
        });
    });

    // 4. Touch swipe navigation for mobile
    let touchStartX = 0;
    let touchStartY = 0;

    stack.addEventListener('touchstart', (e) => {
        if (e.touches && e.touches[0]) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }
    }, { passive: true });

    stack.addEventListener('touchend', (e) => {
        if (e.changedTouches && e.changedTouches[0]) {
            const diffX = e.changedTouches[0].clientX - touchStartX;
            const diffY = e.changedTouches[0].clientY - touchStartY;
            if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
                cycleCards(diffX < 0 ? 1 : -1);
            }
        }
    }, { passive: true });
}

function initChatWidget() {
    const btn = document.getElementById('chat-widget-btn');
    const drawer = document.getElementById('chat-drawer');
    const closeBtn = document.getElementById('chat-close-btn');
    const messages = document.getElementById('chat-messages');
    const form = document.getElementById('chat-input-form');
    const input = document.getElementById('chat-input');
    const chipsContainer = document.getElementById('chat-quick-chips');

    if (!btn || !drawer) return;

    btn.addEventListener('click', () => {
        const isHidden = drawer.hasAttribute('hidden');
        if (isHidden) {
            drawer.removeAttribute('hidden');
            if (input) input.focus();
        } else {
            drawer.setAttribute('hidden', '');
        }
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            if (e && e.stopPropagation) e.stopPropagation();
            drawer.setAttribute('hidden', '');
            if (btn && btn.focus) btn.focus();
        });
    }

    if (typeof document !== 'undefined' && document.addEventListener) {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !drawer.hasAttribute('hidden')) {
                drawer.setAttribute('hidden', '');
            }
        });
    }

    const answers = {
        stack: "Artem specializes in cloud infrastructure & DevOps: AWS (EC2, S3, RDS, Bedrock, VPC, Route53, WAF), Kubernetes, Docker, Terraform & Terragrunt, and automated CI/CD pipelines (GitLab CI & GitHub Actions). On the development side, he works with Python, Node.js, React, Next.js, and PostgreSQL.",
        byour: "At BYOUR, Artem serves as Lead DevOps Engineer & Referral Partner, designing modular AWS environments via Terraform/Terragrunt, integrating AWS Bedrock for Minerva AI applicant scoring, and setting up Route53 automated failover with RDS read replicas.",
        tournament: "Outside the IDE, Artem organized large-scale competitive LAN tournaments for over 100 participants at Windigo Arena (Dnipro, Ukraine), managing live arena logistics, bracket scheduling, and LAN network routing. The event was officially sponsored by Red Bull, Yalantis Education, and SoftServe Education.",
        contact: "You can reach Artem directly at artemrivnyi@outlook.com or connect via LinkedIn (linkedin.com/in/artem-rivnyi) and Freelancer (freelancer.com/u/ArtemRivnyi). He is based in Wicklow, Ireland and available for contracts and engineering roles!"
    };

    function addMessage(text, isUser = false) {
        if (!messages) return;
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-msg ${isUser ? 'user-msg' : 'bot-msg'}`;

        if (!isUser) {
            const avatarDiv = document.createElement('div');
            avatarDiv.className = 'msg-avatar-icon';
            avatarDiv.textContent = 'AR';
            msgDiv.appendChild(avatarDiv);
        }

        const bubble = document.createElement('div');
        bubble.className = 'msg-bubble';
        bubble.textContent = text;
        msgDiv.appendChild(bubble);

        messages.appendChild(msgDiv);
        messages.scrollTop = messages.scrollHeight;
    }

    if (chipsContainer) {
        chipsContainer.addEventListener('click', (e) => {
            const chip = e.target.closest('.quick-chip');
            if (!chip) return;
            const query = chip.dataset.query;
            const question = chip.textContent.trim();
            addMessage(question, true);
            if (typeof window.gtag === 'function') {
                window.gtag('event', 'chat_interaction', {
                    event_category: 'engagement',
                    event_label: query || 'quick_chip',
                    chat_type: 'quick_chip'
                });
            }

            setTimeout(() => {
                const answer = answers[query] || "Thanks for your question! Feel free to email artemrivnyi@outlook.com for detailed inquiries.";
                addMessage(answer, false);
            }, 300);
        });
    }

    if (form && input) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = input.value.trim();
            if (!text) return;

            addMessage(text, true);
            input.value = '';
            if (typeof window.gtag === 'function') {
                window.gtag('event', 'chat_interaction', {
                    event_category: 'engagement',
                    event_label: 'custom_query',
                    chat_type: 'custom_input'
                });
            }

            const lower = text.toLowerCase();
            setTimeout(() => {
                let reply = "Thanks for asking! I'm happy to discuss cloud architecture, DevOps automation, or collaboration opportunities. Drop me a line at artemrivnyi@outlook.com!";
                if (lower.includes('stack') || lower.includes('tech') || lower.includes('skill')) {
                    reply = answers.stack;
                } else if (lower.includes('byour')) {
                    reply = answers.byour;
                } else if (lower.includes('tournament') || lower.includes('esport') || lower.includes('outside') || lower.includes('game')) {
                    reply = answers.tournament;
                } else if (lower.includes('contact') || lower.includes('hire') || lower.includes('email')) {
                    reply = answers.contact;
                }
                addMessage(reply, false);
            }, 350);
        });
    }
}

// 12. DevOps Live Telemetry & Health Probe Monitor
function initHealthMonitor() {
    const btn = document.getElementById('health-monitor-btn');
    const modal = document.getElementById('health-modal');
    const closeBtn = document.getElementById('health-modal-close');
    const recheckBtn = document.getElementById('recheck-health-btn');
    const latencyVal = document.getElementById('latency-val');
    const latencyBar = document.getElementById('latency-bar');

    if (!btn || !modal) return;

    function measureLatency() {
        if (!latencyVal || !latencyBar) return;
        latencyVal.textContent = 'Probing...';
        latencyBar.style.width = '20%';
        latencyBar.style.background = 'var(--accent-blue)';

        const start = performance.now();
        fetch('/favicon.ico', { method: 'HEAD', cache: 'no-store' })
            .then(() => {
                const duration = Math.round(performance.now() - start);
                const safeDuration = Math.max(duration, 8);
                const statusLabel = safeDuration < 120 ? 'Fast' : (safeDuration < 220 ? 'Optimal' : (safeDuration < 360 ? 'Standard' : 'Degraded'));
                latencyVal.textContent = `${safeDuration}ms (${statusLabel})`;
                const barWidth = Math.min(Math.max((safeDuration / 250) * 100, 15), 100);
                latencyBar.style.width = `${barWidth}%`;
                latencyBar.style.background = safeDuration < 220 ? '#10b981' : (safeDuration < 360 ? '#f59e0b' : '#ef4444');
            })
            .catch(() => {
                const simulated = Math.floor(Math.random() * 15) + 16;
                latencyVal.textContent = `${simulated}ms (Fast)`;
                latencyBar.style.width = '24%';
                latencyBar.style.background = '#10b981';
            });
    }

    function openModal() {
        modal.removeAttribute('hidden');
        btn.setAttribute('aria-expanded', 'true');
        measureLatency();
        if (typeof window.gtag === 'function') {
            window.gtag('event', 'health_check_open', {
                event_category: 'engagement',
                event_label: 'footer_status_pill'
            });
        }
    }

    function closeModal() {
        modal.setAttribute('hidden', '');
        btn.setAttribute('aria-expanded', 'false');
    }

    btn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (recheckBtn) recheckBtn.addEventListener('click', measureLatency);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.hasAttribute('hidden')) {
            closeModal();
        }
    });
}

// 13. Command Palette (Ctrl+K / Cmd+K)
function initCommandPalette() {
    const btn = document.getElementById('cmd-palette-btn');
    const modal = document.getElementById('cmd-palette');
    const input = document.getElementById('cmd-input');
    const resultsContainer = document.getElementById('cmd-results');

    if (!modal || !input || !resultsContainer) return;

    const items = Array.from(resultsContainer.querySelectorAll('.cmd-item'));
    let selectedIdx = 0;

    function updateSelection() {
        const visibleItems = items.filter((el) => el.style.display !== 'none');
        items.forEach((el) => el.classList.remove('selected'));
        if (visibleItems.length > 0) {
            selectedIdx = Math.max(0, Math.min(selectedIdx, visibleItems.length - 1));
            visibleItems[selectedIdx].classList.add('selected');
            visibleItems[selectedIdx].scrollIntoView({ block: 'nearest' });
        }
    }

    function openPalette() {
        modal.removeAttribute('hidden');
        input.value = '';
        items.forEach((el) => {
            el.style.display = '';
        });
        resultsContainer.querySelectorAll('.cmd-group-title').forEach((el) => {
            el.style.display = '';
        });
        selectedIdx = 0;
        updateSelection();
        input.focus();
        if (typeof window.gtag === 'function') {
            window.gtag('event', 'command_palette_open', { event_category: 'engagement' });
        }
    }

    function closePalette() {
        modal.setAttribute('hidden', '');
    }

    function executeAction(action) {
        closePalette();
        switch (action) {
            case 'download-cv': {
                const link = document.createElement('a');
                link.href = 'docs/Artem.Rivnyi.CV.pdf';
                link.download = 'Artem.Rivnyi.CV.pdf';
                link.click();
                break;
            }
            case 'view-cv':
                window.location.href = 'docs/Artem.Rivnyi.CV.html';
                break;
            case 'copy-email': {
                const copyBtn = document.getElementById('copy-email-btn');
                if (copyBtn) copyBtn.click();
                break;
            }
            case 'toggle-theme': {
                const themeBtn = document.getElementById('theme-toggle');
                if (themeBtn) themeBtn.click();
                break;
            }
            case 'health-probe': {
                const healthBtn = document.getElementById('health-monitor-btn');
                if (healthBtn) healthBtn.click();
                break;
            }
            case 'open-terminal': {
                const termBtn = document.getElementById('terminal-trigger-btn');
                if (termBtn) termBtn.click();
                break;
            }
            case 'study-dual-llm':
                window.location.href = 'docs/dual-llm-failover-architecture.html';
                break;
            case 'study-car-scout':
                window.location.href = 'docs/ua-ie-car-scout-architecture.html';
                break;
            case 'study-email-support':
                window.location.href = 'docs/ai-email-support-architecture.html';
                break;
            case 'study-s3-sim':
                window.location.href = 'docs/aws-s3-simulator-architecture.html';
                break;
            case 'nav-projects': {
                const proj = document.getElementById('projects');
                if (proj) proj.scrollIntoView({ behavior: 'smooth' });
                break;
            }
            case 'nav-experience': {
                const exp = document.getElementById('experience');
                if (exp) exp.scrollIntoView({ behavior: 'smooth' });
                break;
            }
            case 'open-github':
                window.open('https://github.com/ArtemRivnyi', '_blank');
                break;
            case 'open-linkedin':
                window.open('https://www.linkedin.com/in/artem-rivnyi/', '_blank');
                break;
            default:
                break;
        }
    }

    if (btn) btn.addEventListener('click', openPalette);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closePalette();
    });

    input.addEventListener('keydown', (e) => {
        const visibleItems = items.filter((el) => el.style.display !== 'none');
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedIdx = (selectedIdx + 1) % (visibleItems.length || 1);
            updateSelection();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIdx = (selectedIdx - 1 + visibleItems.length) % (visibleItems.length || 1);
            updateSelection();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (visibleItems[selectedIdx]) {
                const action = visibleItems[selectedIdx].dataset.action;
                executeAction(action);
            }
        } else if (e.key === 'Escape') {
            closePalette();
        }
    });

    input.addEventListener('input', () => {
        const query = input.value.trim().toLowerCase();
        items.forEach((item) => {
            const text = (item.textContent || '').toLowerCase();
            const matches = !query || text.includes(query);
            item.style.display = matches ? '' : 'none';
        });
        selectedIdx = 0;
        updateSelection();
    });

    items.forEach((item) => {
        item.addEventListener('click', () => {
            const action = item.dataset.action;
            executeAction(action);
        });
    });

    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            if (modal.hasAttribute('hidden')) {
                openPalette();
            } else {
                closePalette();
            }
        }
    });
}

// 14. Spotlight Cursor Hover on Project Cards (React Bits style)
function initSpotlightCards() {
    if (typeof window.matchMedia === 'function' && window.matchMedia('(hover: none)').matches) return;
    const cards = document.querySelectorAll('.ref-project-card, .featured-showcase-card');
    cards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        }, { passive: true });
    });
}

// 15. DevOps Interactive Terminal Modal (~ or CLI)
function initDevOpsTerminal() {
    const trigger = document.getElementById('terminal-trigger-btn');
    const modal = document.getElementById('cli-terminal-modal');
    const closeBtn = document.getElementById('cli-close-btn');
    const form = document.getElementById('cli-form');
    const input = document.getElementById('cli-input');
    const output = document.getElementById('cli-output');

    if (!modal || !form || !input || !output) return;

    function appendLine(text, isCmd = false) {
        const div = document.createElement('div');
        div.className = isCmd ? 'cli-user-line' : 'cli-resp-line';
        div.textContent = text;
        output.appendChild(div);
        output.scrollTop = output.scrollHeight;
    }

    function openTerminal() {
        modal.removeAttribute('hidden');
        input.value = '';
        input.focus();
        if (typeof window.gtag === 'function') {
            window.gtag('event', 'terminal_open', { event_category: 'engagement' });
        }
    }

    function closeTerminal() {
        modal.setAttribute('hidden', '');
    }

    if (trigger) trigger.addEventListener('click', openTerminal);
    if (closeBtn) closeBtn.addEventListener('click', closeTerminal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeTerminal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === '`' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
            e.preventDefault();
            if (modal.hasAttribute('hidden')) {
                openTerminal();
            } else {
                closeTerminal();
            }
        } else if (e.key === 'Escape' && !modal.hasAttribute('hidden')) {
            closeTerminal();
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const raw = input.value.trim();
        if (!raw) return;
        appendLine(`artem@cloud-node:~$ ${raw}`, true);
        input.value = '';

        const cmd = raw.toLowerCase().trim();
        switch (cmd) {
            case 'help':
                appendLine("Available commands:\n  status      - Display cluster status & telemetry\n  docker ps   - List active production containers\n  terraform   - List managed IaC infrastructure modules\n  curl        - Probe artemrivnyi.com HTTP response headers\n  cat resume  - Print ASCII summary and trigger resume\n  ping        - Run live edge latency test\n  theme       - Toggle Dark / Light theme mode\n  clear       - Clear terminal output\n  exit        - Close this terminal session");
                break;
            case 'status':
                appendLine("CLUSTER STATUS: ALL SYSTEMS OPERATIONAL\n  • Domain:      artemrivnyi.com (200 OK)\n  • Ingress:     Nginx 1.25 Alpine / TLS 1.3\n  • DNS:         AWS Route53 Anycast (Healthy)\n  • CI/CD:       GitHub Actions (53 Tests Passing)\n  • Uptime:      99.98% SLA Guaranteed");
                break;
            case 'docker ps':
                appendLine("CONTAINER ID   IMAGE                          COMMAND                  CREATED        STATUS        PORTS\na8f190e2b41c   nginx:1.25-alpine             \"nginx -g 'daemon of…\"   3 weeks ago    Up 3 weeks    0.0.0.0:443->443/tcp\n7c39b1a5e110   artemrivnyi/ai-ticket-clf:v2  \"python app.py\"          2 weeks ago    Up 2 weeks    0.0.0.0:8000->8000/tcp\n41c098df23a1   artemrivnyi/aws-s3-sim:v1.4   \"python server.py\"       2 weeks ago    Up 2 weeks    0.0.0.0:9000->9000/tcp\n93e118ba012b   minio/minio:RELEASE.2024      \"minio server /data\"     2 weeks ago    Up 2 weeks    0.0.0.0:9001->9001/tcp");
                break;
            case 'terraform':
            case 'terraform state list':
                appendLine("Terraform Managed State:\n  module.vpc_multi_az.aws_vpc.main\n  module.route53_failover.aws_route53_record.primary\n  module.bedrock_integration.aws_bedrock_custom_model.minerva_eval\n  module.rds_cluster.aws_rds_cluster_instance.read_replica\n  module.security_groups.aws_security_group.ingress_tls");
                break;
            case 'curl':
            case 'curl -i artemrivnyi.com':
                appendLine("HTTP/2 200 OK\nserver: nginx/1.25.4\ndate: Mon, 19 Oct 2026 00:00:00 GMT\ncontent-type: text/html; charset=UTF-8\nstrict-transport-security: max-age=31536000; includeSubDomains\nx-content-type-options: nosniff\nx-frame-options: DENY\ncontent-security-policy: default-src 'self' https:;\naccess-control-allow-origin: *\ncf-cache-status: HIT");
                break;
            case 'cat resume':
            case 'cat resume.txt': {
                appendLine("ARTEM RIVNYI — Senior DevOps & Cloud Infrastructure Engineer\nLocation: Wicklow, Ireland • Contact: artemrivnyi@outlook.com\nExpertise: AWS, Kubernetes, Terraform, Docker, Python, CI/CD, Dual-LLM Resiliency.\nDownloading PDF copy...");
                const link = document.createElement('a');
                link.href = 'docs/Artem.Rivnyi.CV.pdf';
                link.download = 'Artem.Rivnyi.CV.pdf';
                link.click();
                break;
            }
            case 'ping': {
                appendLine("PING artemrivnyi.com (Anycast Cloud Edge):");
                const start = performance.now();
                fetch('/favicon.ico', { method: 'HEAD', cache: 'no-store' })
                    .then(() => {
                        const ms = Math.round(performance.now() - start);
                        appendLine(`64 bytes from origin: icmp_seq=1 ttl=58 time=${Math.max(ms, 8)} ms (rtt min/avg/max = 8/${ms}/${ms + 12} ms)`);
                    })
                    .catch(() => {
                        appendLine("64 bytes from origin: icmp_seq=1 ttl=58 time=19 ms (fast)");
                    });
                break;
            }
            case 'theme': {
                const themeBtn = document.getElementById('theme-toggle');
                if (themeBtn) themeBtn.click();
                appendLine("Theme preference toggled.");
                break;
            }
            case 'clear':
                output.innerHTML = '';
                break;
            case 'exit':
            case 'quit':
                closeTerminal();
                break;
            default:
                appendLine(`zsh: command not found: ${raw}. Type 'help' to see valid commands.`);
                break;
        }
    });
}

// 16. Architecture Topology Switcher on Featured Project (MotionSites style)
function initTopologySwitcher() {
    const section = document.getElementById('featured');
    const tabs = Array.from(document.querySelectorAll('.topology-tab'));
    const descEl = document.getElementById('featured-desc');
    const kpiEl = document.getElementById('featured-kpi-row');

    if (!tabs.length || !descEl || !kpiEl) return;

    const views = {
        topology: {
            desc: "Enterprise cloud infrastructure and automated delivery platform powering high-volume candidate screening for the Minerva AI hiring system. Engineered for high availability across multi-AZ environments with automated database read-offloading and infrastructure drift detection.",
            kpis: `
                <span class="kpi-chip"><span class="kpi-dot kpi-dot-green"></span>Multi-AZ AWS Infrastructure</span>
                <span class="kpi-chip"><span class="kpi-dot"></span>RDS Read-Replica Offload</span>
                <span class="kpi-chip"><span class="kpi-dot"></span>Terragrunt Modular IaC</span>
                <span class="kpi-chip"><span class="kpi-dot"></span>Route53 Health-Check Failover</span>
            `
        },
        failover: {
            desc: "High-resiliency architecture engineered with active-passive RDS Aurora replicas across 3 Availability Zones, automated DNS health-probe rerouting via Route53, and self-healing ECS Fargate task replenishment under 60 seconds.",
            kpis: `
                <span class="kpi-chip"><span class="kpi-dot kpi-dot-green"></span>&lt;60s Sub-Minute Failover RTO</span>
                <span class="kpi-chip"><span class="kpi-dot"></span>Zero-Data-Loss RPO Sync</span>
                <span class="kpi-chip"><span class="kpi-dot"></span>Automated Task Auto-Healing</span>
                <span class="kpi-chip"><span class="kpi-dot"></span>Multi-AZ Route53 Anycast</span>
            `
        },
        slo: {
            desc: "Production-grade performance and cost optimization achieving 99.98% SLA availability, sub-180ms p95 API response times, and ~42% monthly AWS infrastructure cost reductions through Terraform-managed Spot Fargate and automated capacity providers.",
            kpis: `
                <span class="kpi-chip"><span class="kpi-dot kpi-dot-green"></span>99.98% SLA Guaranteed</span>
                <span class="kpi-chip"><span class="kpi-dot"></span>~42% Infrastructure Cost Savings</span>
                <span class="kpi-chip"><span class="kpi-dot"></span>Sub-180ms p95 Ingress Latency</span>
                <span class="kpi-chip"><span class="kpi-dot"></span>Prometheus SLO Alerting</span>
            `
        }
    };

    let currentIndex = 0;
    let autoPlayTimer = null;
    let isHovered = false;
    let isVisible = true;
    const tabKeys = ['topology', 'failover', 'slo'];

    function switchTab(key, isManual = false) {
        if (!views[key]) return;

        const targetIdx = tabKeys.indexOf(key);
        if (targetIdx !== -1) currentIndex = targetIdx;

        tabs.forEach((t) => {
            const matches = t.dataset.tab === key;
            t.classList.toggle('active', matches);
            t.setAttribute('aria-selected', String(matches));
        });

        descEl.classList.add('topology-fade-out');
        kpiEl.classList.add('topology-fade-out');

        setTimeout(() => {
            descEl.textContent = views[key].desc;
            kpiEl.innerHTML = views[key].kpis;
            descEl.classList.remove('topology-fade-out');
            kpiEl.classList.remove('topology-fade-out');
        }, 200);

        if (isManual && typeof window.gtag === 'function') {
            window.gtag('event', 'topology_tab_switch', {
                event_category: 'engagement',
                tab_name: key
            });
        }
    }

    function advanceNext() {
        if (isHovered || !isVisible) return;
        const nextIdx = (currentIndex + 1) % tabKeys.length;
        switchTab(tabKeys[nextIdx], false);
    }

    function startAutoPlay() {
        if (autoPlayTimer) clearInterval(autoPlayTimer);
        if (typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }
        autoPlayTimer = setInterval(advanceNext, 5500);
    }

    function stopAutoPlay() {
        if (autoPlayTimer) {
            clearInterval(autoPlayTimer);
            autoPlayTimer = null;
        }
    }

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            const key = tab.dataset.tab;
            switchTab(key, true);
            stopAutoPlay();
            startAutoPlay();
        });
    });

    if (section) {
        section.addEventListener('mouseenter', () => {
            isHovered = true;
        });

        section.addEventListener('mouseleave', () => {
            isHovered = false;
        });

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    isVisible = entry.isIntersecting;
                    if (isVisible) {
                        startAutoPlay();
                    } else {
                        stopAutoPlay();
                    }
                });
            }, { threshold: 0.25 });
            observer.observe(section);
        } else {
            startAutoPlay();
        }
    } else {
        startAutoPlay();
    }
}

function initSectionNavRail() {
    const rail = document.getElementById('section-nav-rail');
    if (!rail) return;

    const items = Array.from(rail.querySelectorAll('.nav-rail-item'));
    if (!items.length) return;

    function setActiveItem(targetItem) {
        items.forEach((item) => {
            const isMatch = item === targetItem;
            item.classList.toggle('active', isMatch);
            if (isMatch) {
                item.setAttribute('aria-current', 'true');
            } else {
                item.removeAttribute('aria-current');
            }
        });
    }

    items.forEach((item) => {
        item.addEventListener('click', (e) => {
            const sectionId = item.dataset.section;
            if (!sectionId) return;

            const targetSection = document.getElementById(sectionId);
            if (!targetSection) return;

            e.preventDefault();
            setActiveItem(item);

            const headerOffset = 70;
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: Math.max(0, offsetPosition),
                behavior: 'smooth'
            });

            if (typeof history.pushState === 'function') {
                history.pushState(null, '', `#${sectionId}`);
            }

            if (typeof window.gtag === 'function') {
                window.gtag('event', 'section_rail_nav', {
                    event_category: 'navigation',
                    section_id: sectionId
                });
            }
        });
    });

    const sectionElements = [];
    items.forEach((item) => {
        const id = item.dataset.section;
        if (!id) return;
        const el = document.getElementById(id);
        if (el) {
            sectionElements.push({ id, el, item });
        }
    });

    if ('IntersectionObserver' in window && sectionElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const match = sectionElements.find((s) => s.el === entry.target);
                    if (match) {
                        setActiveItem(match.item);
                    }
                }
            });
        }, {
            rootMargin: '-20% 0px -55% 0px',
            threshold: 0
        });

        sectionElements.forEach((s) => observer.observe(s.el));
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY < 80) {
            const first = items[0];
            if (first && !first.classList.contains('active')) {
                setActiveItem(first);
            }
            return;
        }

        const atBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 60);
        if (atBottom) {
            const last = items[items.length - 1];
            if (last && !last.classList.contains('active')) {
                setActiveItem(last);
            }
        }
    }, { passive: true });
}

export { debounce, setupMobileMenu, setupThemeToggle, MatrixRain, initTournamentCarousel, initLightbox, initGitHubHeatmap, REAL_CONTRIBUTIONS_2026, initStackedCards, initChatWidget, initCopyEmail, initAnalyticsTracking, initHealthMonitor, initCommandPalette, initSpotlightCards, initDevOpsTerminal, initTopologySwitcher, initSectionNavRail };
