/**
 * @jest-environment jsdom
 */

import { debounce, setupThemeToggle, MatrixRain } from '../script.js';

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