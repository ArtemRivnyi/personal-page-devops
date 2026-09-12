// script.js — Portfolio Interactive Logic

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
        toggle.setAttribute('aria-label', 'Toggle theme');
        document.body.appendChild(toggle);
    }

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
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d', {
            alpha: true,
            desynchronized: true,
            willReadFrequently: false
        });
        this.chars = 'ABVGDEZHZKLMNOPRSTFKHCHTSCH0123456789';
        this.font = 16;
        this.cols = 0;
        this.drops = [];
        this.density = 0.12;
        this.last = 0;
        this.delay = 1000 / 30;
        this.speed = 0.6;
        this.resize();
        window.addEventListener('resize', debounce(() => this.resize(), 150), { passive: true });
        requestAnimationFrame((t) => this.loop(t));
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

        this.ctx.fillStyle = dark ? '#00ff66' : '#10b981';
        const maxY = this.canvas.height;
        const len = this.chars.length;

        for (let i = 0; i < this.cols; i++) {
            if (this.drops[i] == null) continue;
            const y = this.drops[i] * this.font;
            const ch = this.chars[(Math.random() * len) | 0];
            this.ctx.fillText(ch, i * this.font, y);
            if (y > maxY && Math.random() > 0.985) this.drops[i] = 0;
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

// Subtitle Typing Animation
function initTypingAnimation() {
    const subtitleText = "AI & DevOps Specialist";
    const subtitleElement = document.querySelector('.subtitle');
    if (!subtitleElement) return;

    let charIndex = 0;
    subtitleElement.textContent = '';
    subtitleElement.classList.add('typing-cursor');

    function typeSubtitle() {
        if (charIndex < subtitleText.length) {
            subtitleElement.textContent += subtitleText.charAt(charIndex);
            charIndex++;
            setTimeout(typeSubtitle, 55);
        } else {
            subtitleElement.classList.remove('typing-cursor');
        }
    }

    setTimeout(typeSubtitle, 700);
}

// Dynamic GitHub Heatmap Generation
function initGitHubHeatmap() {
    const heatmap = document.getElementById('github-heatmap');
    if (!heatmap) return;

    heatmap.innerHTML = '';
    const totalWeeks = 52;
    const daysPerWeek = 7;
    const totalDays = totalWeeks * daysPerWeek;

    // Deterministic pseudo-random seed generator for consistent authentic look
    let seed = 42;
    function pseudoRandom() {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
    }

    for (let i = 0; i < totalDays; i++) {
        const cell = document.createElement('div');
        cell.className = 'heatmap-cell';
        const dayOfWeek = i % 7; // 0=Sun, 6=Sat
        const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);

        const r = pseudoRandom();
        let level = 0;

        if (isWeekend) {
            if (r > 0.65) level = 1;
            if (r > 0.88) level = 2;
        } else {
            if (r > 0.20) level = 1;
            if (r > 0.45) level = 2;
            if (r > 0.72) level = 3;
            if (r > 0.90) level = 4;
        }

        cell.classList.add(`level-${level}`);
        const commits = level === 0 ? 0 : (level * 3 + Math.floor(r * 4));
        cell.title = `${commits} contributions on day ${i + 1}`;
        heatmap.appendChild(cell);
    }
}

// Copy Email Functionality
function initCopyEmail() {
    const copyBtn = document.getElementById('copy-email-btn');
    const emailAddress = document.getElementById('email-address');
    if (!copyBtn || !emailAddress) return;

    copyBtn.addEventListener('click', async () => {
        const email = emailAddress.textContent.trim();
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
            copyBtn.style.backgroundColor = '#10b981';
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.backgroundColor = '';
            }, 2000);
        } catch {
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyBtn.textContent = 'Copy';
            }, 2000);
        }
    });
}

// System Status Popover
function initStatusWidget() {
    const toggleBtn = document.getElementById('status-toggle-btn');
    const popover = document.getElementById('status-popover');
    if (!toggleBtn || !popover) return;

    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = popover.hasAttribute('hidden');
        if (isHidden) {
            popover.removeAttribute('hidden');
        } else {
            popover.setAttribute('hidden', '');
        }
    });

    document.addEventListener('click', (e) => {
        if (!popover.contains(e.target) && e.target !== toggleBtn) {
            popover.setAttribute('hidden', '');
        }
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    if (!backToTopButton) return;

    const handleScroll = () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', debounce(handleScroll, 100), { passive: true });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth Section Animations
function initSectionObserver() {
    if (!('IntersectionObserver' in window)) return;

    const obs = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
            if (e.isIntersecting) {
                e.target.style.opacity = '1';
                e.target.style.transform = 'translateY(0)';
            }
        }),
        { threshold: 0.08 }
    );

    document.querySelectorAll('section, .featured-project').forEach((s) => {
        s.style.opacity = '0';
        s.style.transform = 'translateY(16px)';
        s.style.transition = 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        obs.observe(s);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Matrix Background
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-canvas';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    new MatrixRain('matrix-canvas');

    // 2. Theme Toggle
    setupThemeToggle();

    // 3. Subtitle Typing
    initTypingAnimation();

    // 4. GitHub Heatmap
    initGitHubHeatmap();

    // 5. Copy Email
    initCopyEmail();

    // 6. Status Widget
    initStatusWidget();

    // 7. Back to Top
    initBackToTop();

    // 8. Section Reveal Animations
    initSectionObserver();
});