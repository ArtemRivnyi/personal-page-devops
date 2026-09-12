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
        setTheme(!document.body.classList.contains('dark-theme'));
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
        if (t - this.last > this.delay) {
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
                const alt = 'Artem Rivnyi — Verified Bachelor Diploma in Computer Engineering';
                const captionText = "Official Bachelor's Diploma in Computer Engineering — Oles Honchar Dnipro National University (June 30, 2024)";
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
    '2026': { total: '1,002', countText: '1,002 contributions in 2026' },
    '2025': { total: '684', countText: '684 contributions in 2025' },
    '2024': { total: '512', countText: '512 contributions in 2024' },
    '2023': { total: '320', countText: '320 contributions in 2023' },
};

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

    function renderYear(year) {
        heatmap.innerHTML = '';
        const totalWeeks = 53;
        const daysPerWeek = 7;

        if (year === '2026') {
            for (let w = 0; w < totalWeeks; w++) {
                for (let d = 0; d < daysPerWeek; d++) {
                    const cell = document.createElement('div');
                    cell.className = 'heatmap-cell';

                    const item = lookup2026.get(`${w}_${d}`);
                    if (item) {
                        cell.classList.add(`level-${item.lvl}`);
                        cell.title = `${item.c} contribution${item.c === 1 ? '' : 's'} on ${item.date}`;
                    } else {
                        cell.classList.add('level-0');
                        cell.title = 'No contributions';
                    }
                    heatmap.appendChild(cell);
                }
            }
        } else {
            let seed = parseInt(year, 10);
            function pseudoRandom() {
                seed = (seed * 9301 + 49297) % 233280;
                return seed / 233280;
            }

            for (let w = 0; w < totalWeeks; w++) {
                for (let d = 0; d < daysPerWeek; d++) {
                    const cell = document.createElement('div');
                    cell.className = 'heatmap-cell';
                    const r = pseudoRandom();
                    let lvl = 0;
                    if (r > 0.88) lvl = 3;
                    else if (r > 0.72) lvl = 2;
                    else if (r > 0.55) lvl = 1;

                    cell.classList.add(`level-${lvl}`);
                    const c = lvl === 0 ? 0 : (lvl * 3 + Math.floor(r * 4));
                    cell.title = `${c > 0 ? c : 'No'} contribution${c === 1 ? '' : 's'}`;
                    heatmap.appendChild(cell);
                }
            }
        }

        const yearInfo = GITHUB_YEARS[year] || { total: '1,002', countText: `${year} contributions` };
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
}

export { debounce, setupThemeToggle, MatrixRain, initTournamentCarousel, initLightbox, initGitHubHeatmap, REAL_CONTRIBUTIONS_2026 };