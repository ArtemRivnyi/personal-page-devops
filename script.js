// script.js

function setupThemeToggle() {
    const toggle = document.createElement('button');
    toggle.id = 'theme-toggle';
    toggle.setAttribute('aria-label', 'Toggle theme');
    document.body.appendChild(toggle);

    function setTheme(dark) {
        document.body.classList.toggle('dark-theme', dark);
        localStorage.setItem('theme', dark ? 'dark' : 'light');
        toggle.innerHTML = dark ? '🌙' : '☀️';

        const canvas = document.getElementById('matrix-canvas');
        if (canvas) {
            if (dark) {
                canvas.style.opacity = '0.25';
                canvas.style.mixBlendMode = 'screen';
            } else {
                canvas.style.opacity = '0.15';
                canvas.style.mixBlendMode = 'multiply';
            }
        }
    }

    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(saved === 'dark' || (!saved && prefersDark));

    toggle.addEventListener('click', () =>
        setTheme(!document.body.classList.contains('dark-theme'))
    );
}

class MatrixRain {
    constructor(id = 'matrix-canvas') {
        this.canvas = document.getElementById(id);
        this.ctx = this.canvas.getContext('2d', {
            alpha: true,
            desynchronized: true,
            willReadFrequently: false
        });
        this.chars = 'ABVGDEZHZKLMNOPRSTFKHCHTSCH0123456789';
        this.font = 16;
        this.cols = 0;
        this.drops = [];
        this.density = 0.3;
        this.last = 0;
        this.delay = 1000 / 20;
        this.speed = 0.6;
        this.resize();
        window.addEventListener('resize', () => this.resize(), { passive: true });
        requestAnimationFrame((t) => this.loop(t));
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.cols = Math.floor(this.canvas.width / this.font);
        this.drops = Array.from({ length: this.cols }, () =>
            Math.random() < this.density ? Math.random() * -50 : null
        );
        this.ctx.font = `${this.font}px monospace`;
        this.ctx.textBaseline = 'top';
    }

    draw() {
        const dark = document.body.classList.contains('dark-theme');

        // Gentler cleaning to avoid artefacts
        this.ctx.fillStyle = dark ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.20)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = dark ? '#00ff66' : '#004400';
        const maxY = this.canvas.height;
        const len = this.chars.length;

        for (let i = 0; i < this.cols; i++) {
            if (this.drops[i] == null) continue;
            const y = this.drops[i] * this.font;
            const ch = this.chars[(Math.random() * len) | 0];
            this.ctx.fillText(ch, i * this.font, y);
            if (y > maxY && Math.random() > 0.975) this.drops[i] = 0;
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

document.addEventListener('DOMContentLoaded', () => {
    setupThemeToggle();

    // Gradient sans artefacts
    const gradient = document.createElement('div');
    gradient.className = 'gradient-overlay';
    document.body.appendChild(gradient);

    // Canvas avec optimisation
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-canvas';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.cssText = `
        position:fixed;top:0;left:0;width:100%;height:100%;
        z-index:-3;pointer-events:none;
        opacity:0.15;background:transparent;
        mix-blend-mode:multiply;
        will-change:transform;
        transform:translateZ(0);
        contain:paint layout size;
    `;
    document.body.appendChild(canvas);

    new MatrixRain('matrix-canvas');

    // We provide the appropriate nappies
    const container = document.querySelector('.container');
    if (container) {
        container.style.position = 'relative';
        container.style.zIndex = '10';
        container.style.transform = 'translateZ(0)';
    }

    // Light animation of the appearance of sections
    const obs = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
            if (e.isIntersecting) {
                e.target.style.opacity = '1';
                e.target.style.transform = 'translateY(0)';
            }
        }),
        { threshold: 0.1 }
    );

    document.querySelectorAll('section').forEach((s) => {
        s.style.opacity = '0';
        s.style.transform = 'translateY(20px)';
        s.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        obs.observe(s);
    });
});