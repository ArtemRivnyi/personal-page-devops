/**
 * @jest-environment jsdom
 */

import { debounce, setupThemeToggle, MatrixRain, initTournamentCarousel, initLightbox, initGitHubHeatmap, REAL_CONTRIBUTIONS_2026, initStackedCards, initChatWidget, initCopyEmail, initHealthMonitor, initCommandPalette, initSpotlightCards, initDevOpsTerminal, initTopologySwitcher, initSectionNavRail } from '../script.exports.js';

// Mock canvas getContext before any tests run (without jest.fn)
beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = function() {
    return {
      fillStyle: '',
      fillRect: function() {},
      fillText: function() {},
      font: '',
      textBaseline: '',
    };
  };
});

describe('debounce function', () => {
  test('should exist and be a function', () => {
    expect(typeof debounce).toBe('function');
  });

  test('should return a function', () => {
    const debouncedFunc = debounce(() => {}, 100);
    expect(typeof debouncedFunc).toBe('function');
  });

  test('should delay execution', (done) => {
    let called = false;
    const testFunc = () => { called = true; };
    const debouncedFunc = debounce(testFunc, 50);

    debouncedFunc();
    expect(called).toBe(false);

    setTimeout(() => {
      expect(called).toBe(true);
      done();
    }, 100);
  });

  test('should pass arguments correctly', (done) => {
    let capturedArgs = null;
    const testFunc = (...args) => { capturedArgs = args; };
    const debouncedFunc = debounce(testFunc, 50);

    debouncedFunc('test', 123, { key: 'value' });

    setTimeout(() => {
      expect(capturedArgs).toEqual(['test', 123, { key: 'value' }]);
      done();
    }, 100);
  });

  test('should cancel previous call when called again', (done) => {
    let callCount = 0;
    const testFunc = () => { callCount++; };
    const debouncedFunc = debounce(testFunc, 100);

    debouncedFunc();
    setTimeout(() => debouncedFunc(), 50);
    setTimeout(() => debouncedFunc(), 80);

    setTimeout(() => {
      expect(callCount).toBe(1);
      done();
    }, 250);
  });
});

describe('setupThemeToggle', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    localStorage.clear();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    localStorage.clear();
  });

  test('should create theme toggle button', () => {
    setupThemeToggle();
    const toggle = document.getElementById('theme-toggle');
    expect(toggle).toBeTruthy();
    expect(toggle.tagName).toBe('BUTTON');
  });

  test('should set aria-label on toggle button', () => {
    setupThemeToggle();
    const toggle = document.getElementById('theme-toggle');
    expect(toggle.getAttribute('aria-label')).toBe('Toggle theme');
  });

  test('should respect saved theme preference', () => {
    localStorage.setItem('theme', 'dark');
    setupThemeToggle();
    expect(document.body.classList.contains('dark-theme')).toBe(true);
  });

  test('should toggle theme on click', () => {
    setupThemeToggle();
    const toggle = document.getElementById('theme-toggle');
    const initialTheme = document.body.classList.contains('dark-theme');
    
    toggle.click();
    
    expect(document.body.classList.contains('dark-theme')).toBe(!initialTheme);
  });

  test('should save theme to localStorage', () => {
    setupThemeToggle();
    const toggle = document.getElementById('theme-toggle');
    
    toggle.click();
    
    const savedTheme = localStorage.getItem('theme');
    expect(savedTheme).toBeTruthy();
    expect(['light', 'dark']).toContain(savedTheme);
  });
});

describe('MatrixRain', () => {
  beforeEach(() => {
    document.body.innerHTML = '<canvas id="test-canvas"></canvas>';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should create MatrixRain instance', () => {
    const matrix = new MatrixRain('test-canvas');
    expect(matrix).toBeTruthy();
    expect(matrix.canvas).toBeTruthy();
  });

  test('should have correct initial properties', () => {
    const matrix = new MatrixRain('test-canvas');
    expect(matrix.font).toBe(16);
    expect(matrix.speed).toBe(0.6);
    expect(matrix.density).toBe(0.3);
  });

  test('should initialize canvas context', () => {
    const matrix = new MatrixRain('test-canvas');
    expect(matrix.ctx).toBeTruthy();
    expect(typeof matrix.ctx.fillRect).toBe('function');
  });

  test('should calculate columns based on canvas width', () => {
    const matrix = new MatrixRain('test-canvas');
    const expectedCols = Math.floor(matrix.canvas.width / matrix.font);
    expect(matrix.cols).toBe(expectedCols);
  });

  test('should initialize drops array', () => {
    const matrix = new MatrixRain('test-canvas');
    expect(Array.isArray(matrix.drops)).toBe(true);
    expect(matrix.drops.length).toBe(matrix.cols);
  });

  test('should have resize method', () => {
    const matrix = new MatrixRain('test-canvas');
    expect(typeof matrix.resize).toBe('function');
  });

  test('should have draw method', () => {
    const matrix = new MatrixRain('test-canvas');
    expect(typeof matrix.draw).toBe('function');
  });

  test('should have loop method', () => {
    const matrix = new MatrixRain('test-canvas');
    expect(typeof matrix.loop).toBe('function');
  });
});

describe('DOM interactions', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <nav>
        <a href="#section1">Section 1</a>
        <a href="#section2">Section 2</a>
      </nav>
      <section id="section1"></section>
      <section id="section2"></section>
      <div class="project"></div>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should handle navigation clicks', () => {
    const links = document.querySelectorAll('nav a');
    expect(links.length).toBe(2);
  });

  test('should find sections by id', () => {
    const section1 = document.querySelector('#section1');
    const section2 = document.querySelector('#section2');
    
    expect(section1).toBeTruthy();
    expect(section2).toBeTruthy();
  });

  test('should find project elements', () => {
    const projects = document.querySelectorAll('.project');
    expect(projects.length).toBeGreaterThan(0);
  });

  test('navigation links should have correct href attributes', () => {
    const links = document.querySelectorAll('nav a');
    const hrefs = Array.from(links).map(link => link.getAttribute('href'));
    
    expect(hrefs).toContain('#section1');
    expect(hrefs).toContain('#section2');
  });
});

describe('debounce edge cases', () => {
  test('should handle debounce with 0 wait time', (done) => {
    let called = false;
    const testFunc = () => { called = true; };
    const debouncedFunc = debounce(testFunc, 0);

    debouncedFunc();

    setTimeout(() => {
      expect(called).toBe(true);
      done();
    }, 10);
  });

  test('should handle multiple arguments', (done) => {
    let result = null;
    const testFunc = (a, b, c) => { result = a + b + c; };
    const debouncedFunc = debounce(testFunc, 50);

    debouncedFunc(1, 2, 3);

    setTimeout(() => {
      expect(result).toBe(6);
      done();
    }, 100);
  });
});

describe('initTournamentCarousel', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="tournament-carousel" id="tournament-carousel">
        <div class="carousel-counter" id="carousel-counter">1 / 3</div>
        <div class="carousel-slides" id="carousel-slides">
          <div class="carousel-slide active" data-index="0">
            <img src="slide1.jpg" alt="Slide 1" class="carousel-img lightbox-trigger">
            <div class="carousel-caption">Caption 1</div>
          </div>
          <div class="carousel-slide" data-index="1">
            <img src="slide2.jpg" alt="Slide 2" class="carousel-img lightbox-trigger">
            <div class="carousel-caption">Caption 2</div>
          </div>
          <div class="carousel-slide" data-index="2">
            <img src="slide3.jpg" alt="Slide 3" class="carousel-img lightbox-trigger">
            <div class="carousel-caption">Caption 3</div>
          </div>
        </div>
        <button type="button" class="carousel-nav-btn prev-btn" id="carousel-prev">‹</button>
        <button type="button" class="carousel-nav-btn next-btn" id="carousel-next">›</button>
        <div class="carousel-dots" id="carousel-dots"></div>
      </div>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should handle missing carousel gracefully', () => {
    document.body.innerHTML = '';
    expect(() => initTournamentCarousel()).not.toThrow();
  });

  test('should initialize dots and counter', () => {
    initTournamentCarousel();
    const dots = document.querySelectorAll('.carousel-dot');
    expect(dots.length).toBe(3);
    expect(dots[0].classList.contains('active')).toBe(true);
    const counter = document.getElementById('carousel-counter');
    expect(counter.textContent).toBe('1 / 3');
  });

  test('should navigate next and prev', () => {
    initTournamentCarousel();
    const nextBtn = document.getElementById('carousel-next');
    const prevBtn = document.getElementById('carousel-prev');
    const slides = document.querySelectorAll('.carousel-slide');
    const counter = document.getElementById('carousel-counter');

    nextBtn.click();
    expect(slides[1].classList.contains('active')).toBe(true);
    expect(counter.textContent).toBe('2 / 3');

    nextBtn.click();
    expect(slides[2].classList.contains('active')).toBe(true);
    expect(counter.textContent).toBe('3 / 3');

    // Wrap around to start
    nextBtn.click();
    expect(slides[0].classList.contains('active')).toBe(true);
    expect(counter.textContent).toBe('1 / 3');

    // Wrap around backward
    prevBtn.click();
    expect(slides[2].classList.contains('active')).toBe(true);
    expect(counter.textContent).toBe('3 / 3');
  });

  test('should navigate when clicking dots', () => {
    initTournamentCarousel();
    const dots = document.querySelectorAll('.carousel-dot');
    const slides = document.querySelectorAll('.carousel-slide');
    const counter = document.getElementById('carousel-counter');

    dots[2].click();
    expect(slides[2].classList.contains('active')).toBe(true);
    expect(dots[2].classList.contains('active')).toBe(true);
    expect(counter.textContent).toBe('3 / 3');
  });

  test('should handle touch swipe', () => {
    initTournamentCarousel();
    const carousel = document.getElementById('tournament-carousel');
    const slides = document.querySelectorAll('.carousel-slide');

    // Swipe left (next)
    carousel.dispatchEvent(new CustomEvent('touchstart', {
      bubbles: true,
      detail: {}
    }));
    // emulate changedTouches
    const touchStartEvent = new Event('touchstart');
    touchStartEvent.changedTouches = [{ screenX: 200 }];
    carousel.dispatchEvent(touchStartEvent);

    const touchEndEvent = new Event('touchend');
    touchEndEvent.changedTouches = [{ screenX: 100 }];
    carousel.dispatchEvent(touchEndEvent);

    expect(slides[1].classList.contains('active')).toBe(true);
  });
});

describe('initLightbox', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="lightbox-modal" hidden role="dialog">
        <div id="lightbox-backdrop"></div>
        <button id="lightbox-close" type="button">×</button>
        <img id="lightbox-img" src="" alt="">
        <div id="lightbox-caption"></div>
      </div>
      <div class="carousel-slide">
        <img src="tourney.jpg" alt="Trophy Cup" class="lightbox-trigger">
        <div class="carousel-caption">Trophy Cup Winner 2021</div>
      </div>
      <button type="button" class="lightbox-trigger view-diploma-btn" data-target="diploma.png">View Diploma</button>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should handle missing modal gracefully', () => {
    document.body.innerHTML = '';
    expect(() => initLightbox()).not.toThrow();
  });

  test('should open image when image trigger clicked', () => {
    initLightbox();
    const imgTrigger = document.querySelector('img.lightbox-trigger');
    const modal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');

    imgTrigger.click();

    expect(modal.hasAttribute('hidden')).toBe(false);
    expect(lightboxImg.getAttribute('src')).toBe('tourney.jpg');
    expect(lightboxCaption.textContent).toBe('Trophy Cup Winner 2021');
    expect(document.body.style.overflow).toBe('hidden');
  });

  test('should open diploma when data-target button clicked', () => {
    initLightbox();
    const btnTrigger = document.querySelector('button.lightbox-trigger');
    const modal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');

    btnTrigger.click();

    expect(modal.hasAttribute('hidden')).toBe(false);
    expect(lightboxImg.getAttribute('src')).toBe('diploma.png');
    expect(lightboxCaption.textContent).toContain('Bachelor');
  });

  test('should close when close button clicked', () => {
    initLightbox();
    const imgTrigger = document.querySelector('img.lightbox-trigger');
    const modal = document.getElementById('lightbox-modal');
    const closeBtn = document.getElementById('lightbox-close');

    imgTrigger.click();
    expect(modal.hasAttribute('hidden')).toBe(false);

    closeBtn.click();
    expect(modal.hasAttribute('hidden')).toBe(true);
    expect(document.body.style.overflow).toBe('');
  });

  test('should close when backdrop clicked', () => {
    initLightbox();
    const imgTrigger = document.querySelector('img.lightbox-trigger');
    const modal = document.getElementById('lightbox-modal');
    const backdrop = document.getElementById('lightbox-backdrop');

    imgTrigger.click();
    expect(modal.hasAttribute('hidden')).toBe(false);

    backdrop.click();
    expect(modal.hasAttribute('hidden')).toBe(true);
  });

  test('should close on Escape keydown', () => {
    initLightbox();
    const imgTrigger = document.querySelector('img.lightbox-trigger');
    const modal = document.getElementById('lightbox-modal');

    imgTrigger.click();
    expect(modal.hasAttribute('hidden')).toBe(false);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(modal.hasAttribute('hidden')).toBe(true);
  });
});

describe('initGitHubHeatmap', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="activity-summary-badge">1,002 contributions in 2026</div>
      <h3 id="activity-contrib-count">1,002 contributions in 2026</h3>
      <div id="github-heatmap"></div>
      <button type="button" class="year-pill active" data-year="2026">2026</button>
      <button type="button" class="year-pill" data-year="2025">2025</button>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should handle missing heatmap container gracefully', () => {
    document.body.innerHTML = '';
    expect(() => initGitHubHeatmap()).not.toThrow();
  });

  test('should render 53 weeks x 7 days = 371 cells for 2026', () => {
    initGitHubHeatmap();
    const cells = document.querySelectorAll('.heatmap-cell');
    expect(cells.length).toBe(53 * 7);
  });

  test('should render active cells for known 2026 contribution dates matching 1,002 contributions', () => {
    initGitHubHeatmap();
    const activeCells = document.querySelectorAll('.heatmap-cell:not(.level-0)');
    expect(activeCells.length).toBe(82);
    expect(REAL_CONTRIBUTIONS_2026.length).toBe(82);
    const totalCount = REAL_CONTRIBUTIONS_2026.reduce((acc, cur) => acc + cur.c, 0);
    expect(totalCount).toBe(1002);
  });

  test('should switch years and update headings when clicking year buttons', () => {
    initGitHubHeatmap();
    const btn2025 = document.querySelector('.year-pill[data-year="2025"]');
    const btn2026 = document.querySelector('.year-pill[data-year="2026"]');
    const heading = document.getElementById('activity-contrib-count');
    const badge = document.getElementById('activity-summary-badge');

    btn2025.click();
    expect(btn2025.classList.contains('active')).toBe(true);
    expect(btn2026.classList.contains('active')).toBe(false);
    expect(heading.textContent).toContain('2025');
    expect(badge.textContent).toContain('2025');

    btn2026.click();
    expect(btn2026.classList.contains('active')).toBe(true);
    expect(heading.textContent).toMatch(/(\d+,\d+|\d+) contributions in 2026/);
    expect(badge.textContent).toMatch(/(\d+,\d+|\d+) contributions in 2026/);
  });
});

describe('initStackedCards', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="tournament-stack">
        <div class="stacked-card card-pos-1"><img src="cups.jpg"></div>
        <div class="stacked-card card-pos-2"><img src="stage.jpg"></div>
        <div class="stacked-card card-pos-3"><img src="matches.jpg"></div>
        <div class="stacked-card card-pos-4"><img src="awards.jpg"></div>
      </div>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should handle missing stack gracefully', () => {
    document.body.innerHTML = '';
    expect(() => initStackedCards()).not.toThrow();
  });

  test('should cycle card position classes when stack clicked', () => {
    initStackedCards();
    const stack = document.getElementById('tournament-stack');
    const cards = stack.querySelectorAll('.stacked-card');

    expect(cards[0].classList.contains('card-pos-1')).toBe(true);
    expect(cards[1].classList.contains('card-pos-2')).toBe(true);

    // click stack background
    stack.click();

    expect(cards[0].classList.contains('card-pos-2')).toBe(true);
    expect(cards[1].classList.contains('card-pos-3')).toBe(true);
  });

  test('should not cycle stack if clicking directly on img (handled by lightbox)', () => {
    initStackedCards();
    const stack = document.getElementById('tournament-stack');
    const img = stack.querySelector('img');
    const card = stack.querySelector('.card-pos-1');

    img.click();
    expect(card.classList.contains('card-pos-1')).toBe(true);
  });
});

describe('initChatWidget', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button type="button" id="chat-widget-btn">Chat</button>
      <div id="chat-drawer" hidden>
        <button type="button" id="chat-close-btn">×</button>
        <div id="chat-messages"></div>
        <div id="chat-quick-chips">
          <button type="button" class="quick-chip" data-query="stack">What is Artem's stack?</button>
        </div>
        <form id="chat-input-form">
          <input type="text" id="chat-input" value="">
          <button type="submit">Send</button>
        </form>
      </div>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should handle missing chat widget gracefully', () => {
    document.body.innerHTML = '';
    expect(() => initChatWidget()).not.toThrow();
  });

  test('should toggle drawer hidden attribute when button clicked', () => {
    initChatWidget();
    const btn = document.getElementById('chat-widget-btn');
    const drawer = document.getElementById('chat-drawer');

    expect(drawer.hasAttribute('hidden')).toBe(true);
    btn.click();
    expect(drawer.hasAttribute('hidden')).toBe(false);
    btn.click();
    expect(drawer.hasAttribute('hidden')).toBe(true);
  });

  test('should close drawer when close button clicked', () => {
    initChatWidget();
    const btn = document.getElementById('chat-widget-btn');
    const drawer = document.getElementById('chat-drawer');
    const closeBtn = document.getElementById('chat-close-btn');

    btn.click();
    expect(drawer.hasAttribute('hidden')).toBe(false);
    closeBtn.click();
    expect(drawer.hasAttribute('hidden')).toBe(true);
  });

  test('should add messages when quick chip clicked', (done) => {
    initChatWidget();
    const chip = document.querySelector('.quick-chip');
    const messages = document.getElementById('chat-messages');

    chip.click();

    expect(messages.children.length).toBe(1);
    expect(messages.children[0].textContent).toContain("What is Artem's stack?");

    setTimeout(() => {
      expect(messages.children.length).toBe(2);
      expect(messages.children[1].textContent).toContain('AWS');
      done();
    }, 350);
  });

  test('should handle form submission with custom query', (done) => {
    initChatWidget();
    const form = document.getElementById('chat-input-form');
    const input = document.getElementById('chat-input');
    const messages = document.getElementById('chat-messages');

    input.value = 'Tell me about Byour infrastructure';
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    expect(messages.children.length).toBe(1);
    expect(input.value).toBe('');

    setTimeout(() => {
      expect(messages.children.length).toBe(2);
      expect(messages.children[1].textContent).toContain('BYOUR');
      done();
    }, 400);
  });
});

describe('initCopyEmail', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <span id="email-address">artemrivnyi@outlook.com</span>
      <button type="button" id="copy-email-btn">Copy</button>
      <div id="copy-toast" hidden>Copied</div>
    `;
    // Mock navigator.clipboard
    Object.assign(navigator, {
      clipboard: {
        writeText: (text) => Promise.resolve(text)
      }
    });
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should handle missing copy button gracefully', () => {
    document.body.innerHTML = '';
    expect(() => initCopyEmail()).not.toThrow();
  });

  test('should copy email and show toast on click', async () => {
    initCopyEmail();
    const btn = document.getElementById('copy-email-btn');
    const toast = document.getElementById('copy-toast');

    await btn.click();
    expect(toast.hasAttribute('hidden')).toBe(false);
  });
});

describe('initHealthMonitor', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button type="button" id="health-monitor-btn" aria-expanded="false">99.9% Uptime</button>
      <div id="health-modal" hidden>
        <button type="button" id="health-modal-close">Close</button>
        <span id="latency-val"></span>
        <div id="latency-bar"></div>
        <button type="button" id="recheck-health-btn">Re-check</button>
      </div>
    `;
    global.fetch = () => Promise.resolve({ ok: true });
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should handle missing elements gracefully', () => {
    document.body.innerHTML = '';
    expect(() => initHealthMonitor()).not.toThrow();
  });

  test('should open health modal on button click', () => {
    initHealthMonitor();
    const btn = document.getElementById('health-monitor-btn');
    const modal = document.getElementById('health-modal');

    btn.click();
    expect(modal.hasAttribute('hidden')).toBe(false);
    expect(btn.getAttribute('aria-expanded')).toBe('true');
  });

  test('should close health modal when close button clicked', () => {
    initHealthMonitor();
    const btn = document.getElementById('health-monitor-btn');
    const modal = document.getElementById('health-modal');
    const closeBtn = document.getElementById('health-modal-close');

    btn.click();
    expect(modal.hasAttribute('hidden')).toBe(false);

    closeBtn.click();
    expect(modal.hasAttribute('hidden')).toBe(true);
    expect(btn.getAttribute('aria-expanded')).toBe('false');
  });

  test('should close modal on Escape keydown', () => {
    initHealthMonitor();
    const btn = document.getElementById('health-monitor-btn');
    const modal = document.getElementById('health-modal');

    btn.click();
    expect(modal.hasAttribute('hidden')).toBe(false);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(modal.hasAttribute('hidden')).toBe(true);
  });
});

describe('initCommandPalette', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button type="button" id="cmd-palette-btn">⌘K</button>
      <div id="cmd-palette" hidden>
        <input type="text" id="cmd-input">
        <div id="cmd-results">
          <button type="button" class="cmd-item" data-action="toggle-theme">Toggle Theme</button>
          <button type="button" class="cmd-item" data-action="copy-email">Copy Email</button>
        </div>
      </div>
      <button type="button" id="theme-toggle"></button>
      <button type="button" id="copy-email-btn"></button>
    `;
    Element.prototype.scrollIntoView = () => {};
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should handle missing elements gracefully', () => {
    document.body.innerHTML = '';
    expect(() => initCommandPalette()).not.toThrow();
  });

  test('should open palette on button click and close on Escape', () => {
    initCommandPalette();
    const btn = document.getElementById('cmd-palette-btn');
    const modal = document.getElementById('cmd-palette');
    const input = document.getElementById('cmd-input');

    btn.click();
    expect(modal.hasAttribute('hidden')).toBe(false);

    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(modal.hasAttribute('hidden')).toBe(true);
  });

  test('should toggle palette with Ctrl+K shortcut', () => {
    initCommandPalette();
    const modal = document.getElementById('cmd-palette');

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));
    expect(modal.hasAttribute('hidden')).toBe(false);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));
    expect(modal.hasAttribute('hidden')).toBe(true);
  });

  test('should filter items as user types', () => {
    initCommandPalette();
    const btn = document.getElementById('cmd-palette-btn');
    const input = document.getElementById('cmd-input');
    const items = document.querySelectorAll('.cmd-item');

    btn.click();
    input.value = 'email';
    input.dispatchEvent(new Event('input'));

    expect(items[0].style.display).toBe('none');
    expect(items[1].style.display).toBe('');
  });

  test('should execute action when item clicked', () => {
    initCommandPalette();
    let themeClicked = false;
    document.getElementById('theme-toggle').addEventListener('click', () => {
      themeClicked = true;
    });

    const items = document.querySelectorAll('.cmd-item');
    items[0].click();
    expect(themeClicked).toBe(true);
  });
});

describe('initSpotlightCards', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="ref-project-card"></div>
      <div class="featured-showcase-card"></div>
    `;
    window.matchMedia = () => ({ matches: false });
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should update --mouse-x and --mouse-y properties on mousemove', () => {
    initSpotlightCards();
    const card = document.querySelector('.ref-project-card');
    card.getBoundingClientRect = () => ({ left: 50, top: 50, width: 200, height: 200 });

    card.dispatchEvent(new MouseEvent('mousemove', { clientX: 100, clientY: 120 }));
    expect(card.style.getPropertyValue('--mouse-x')).toBe('50px');
    expect(card.style.getPropertyValue('--mouse-y')).toBe('70px');
  });
});

describe('initDevOpsTerminal', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button type="button" id="terminal-trigger-btn">&gt;_</button>
      <div id="cli-terminal-modal" hidden>
        <button type="button" id="cli-close-btn"></button>
        <div id="cli-output"></div>
        <form id="cli-form">
          <input type="text" id="cli-input">
          <button type="submit">Run</button>
        </form>
      </div>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should handle missing elements gracefully', () => {
    document.body.innerHTML = '';
    expect(() => initDevOpsTerminal()).not.toThrow();
  });

  test('should open terminal on button click and close on closeBtn', () => {
    initDevOpsTerminal();
    const btn = document.getElementById('terminal-trigger-btn');
    const modal = document.getElementById('cli-terminal-modal');
    const closeBtn = document.getElementById('cli-close-btn');

    btn.click();
    expect(modal.hasAttribute('hidden')).toBe(false);

    closeBtn.click();
    expect(modal.hasAttribute('hidden')).toBe(true);
  });

  test('should open and close terminal on backtick keydown', () => {
    initDevOpsTerminal();
    const modal = document.getElementById('cli-terminal-modal');

    document.dispatchEvent(new KeyboardEvent('keydown', { key: '`' }));
    expect(modal.hasAttribute('hidden')).toBe(false);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(modal.hasAttribute('hidden')).toBe(true);
  });

  test('should run help command and output available commands', () => {
    initDevOpsTerminal();
    const form = document.getElementById('cli-form');
    const input = document.getElementById('cli-input');
    const output = document.getElementById('cli-output');

    input.value = 'help';
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    expect(output.textContent).toContain('Available commands:');
    expect(output.textContent).toContain('docker ps');
  });

  test('should run status, docker ps, and clear commands', () => {
    initDevOpsTerminal();
    const form = document.getElementById('cli-form');
    const input = document.getElementById('cli-input');
    const output = document.getElementById('cli-output');

    input.value = 'status';
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    expect(output.textContent).toContain('CLUSTER STATUS: ALL SYSTEMS OPERATIONAL');

    input.value = 'docker ps';
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    expect(output.textContent).toContain('CONTAINER ID');

    input.value = 'clear';
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    expect(output.textContent).toBe('');
  });

  test('should close terminal on exit command', () => {
    initDevOpsTerminal();
    const modal = document.getElementById('cli-terminal-modal');
    const form = document.getElementById('cli-form');
    const input = document.getElementById('cli-input');

    modal.removeAttribute('hidden');
    input.value = 'exit';
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    expect(modal.hasAttribute('hidden')).toBe(true);
  });
});

describe('initTopologySwitcher', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="topology-switcher-bar">
        <button type="button" class="topology-tab active" data-tab="topology" aria-selected="true">Topology</button>
        <button type="button" class="topology-tab" data-tab="failover" aria-selected="false">Failover</button>
        <button type="button" class="topology-tab" data-tab="slo" aria-selected="false">SLO</button>
      </div>
      <p id="featured-desc">Initial Desc</p>
      <div id="featured-kpi-row"><span>Initial KPI</span></div>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should handle missing elements gracefully', () => {
    document.body.innerHTML = '';
    expect(() => initTopologySwitcher()).not.toThrow();
  });

  test('should switch active tab and update desc and KPIs on click', (done) => {
    initTopologySwitcher();
    const tabs = document.querySelectorAll('.topology-tab');
    const desc = document.getElementById('featured-desc');
    const kpi = document.getElementById('featured-kpi-row');

    tabs[1].click(); // click Failover
    expect(tabs[1].classList.contains('active')).toBe(true);
    expect(tabs[1].getAttribute('aria-selected')).toBe('true');
    expect(tabs[0].classList.contains('active')).toBe(false);

    setTimeout(() => {
      expect(desc.textContent).toContain('High-resiliency architecture engineered with active-passive RDS Aurora replicas');
      expect(kpi.innerHTML).toContain('Sub-Minute Failover RTO');
      done();
    }, 220);
  });

  test('should switch to slo tab and update desc and KPIs', (done) => {
    initTopologySwitcher();
    const tabs = document.querySelectorAll('.topology-tab');
    const desc = document.getElementById('featured-desc');
    const kpi = document.getElementById('featured-kpi-row');

    tabs[2].click(); // click SLO
    expect(tabs[2].classList.contains('active')).toBe(true);

    setTimeout(() => {
      expect(desc.textContent).toContain('Production-grade performance and cost optimization');
      expect(kpi.innerHTML).toContain('99.98% SLA Guaranteed');
      done();
    }, 220);
  });
});

describe('initSectionNavRail', () => {
  beforeEach(() => {
    Element.prototype.scrollIntoView = function() {};
    document.body.innerHTML = `
      <section id="about"></section>
      <section id="featured"></section>
      <section id="contact"></section>
      <nav class="section-nav-rail" id="section-nav-rail">
        <div class="nav-rail-track">
          <a href="#about" class="nav-rail-item active" data-section="about" aria-current="true">
            <span class="nav-rail-dot"></span>
            <span class="nav-rail-tooltip"><span class="nav-rail-num">01</span> Overview</span>
          </a>
          <a href="#featured" class="nav-rail-item" data-section="featured">
            <span class="nav-rail-dot"></span>
            <span class="nav-rail-tooltip"><span class="nav-rail-num">02</span> Featured</span>
          </a>
          <a href="#contact" class="nav-rail-item" data-section="contact">
            <span class="nav-rail-dot"></span>
            <span class="nav-rail-tooltip"><span class="nav-rail-num">03</span> Contact</span>
          </a>
        </div>
      </nav>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should handle missing rail gracefully', () => {
    document.body.innerHTML = '';
    expect(() => initSectionNavRail()).not.toThrow();
  });

  test('should switch active rail item and update aria-current on click', () => {
    initSectionNavRail();
    const items = document.querySelectorAll('.nav-rail-item');
    expect(items[0].classList.contains('active')).toBe(true);

    items[1].click();
    expect(items[1].classList.contains('active')).toBe(true);
    expect(items[1].getAttribute('aria-current')).toBe('true');
    expect(items[0].classList.contains('active')).toBe(false);
    expect(items[0].hasAttribute('aria-current')).toBe(false);
  });

  test('should handle scroll to top activating first item', () => {
    initSectionNavRail();
    const items = document.querySelectorAll('.nav-rail-item');
    items[2].click();
    expect(items[2].classList.contains('active')).toBe(true);

    window.scrollY = 20;
    window.dispatchEvent(new Event('scroll'));
    expect(items[0].classList.contains('active')).toBe(true);
  });
});

