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
        toggle.innerHTML = dark ? '<span class="theme-icon">🌙</span>' : '<span class="theme-icon">☀️</span>';

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

export { debounce, setupThemeToggle, MatrixRain };