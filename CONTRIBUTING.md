# Contributing to DevOps Portfolio & Platform

Thank you for your interest in improving this project!

##  Getting Started

1. Fork and clone the repository:
   ```bash
   git clone https://github.com/ArtemRivnyi/personal-page-devops.git
   cd personal-page-devops
   ```
2. Install development dependencies:
   ```bash
   npm install
   ```

##  Testing & Validation

Before submitting changes, ensure all linting and test suites pass:
```bash
# Run unit & DOM interaction tests
npm test

# Run ESLint validation
npm run lint

# Run Stylelint CSS validation
npm run lint:css
```

##  Code Standards

* **Vanilla Architecture**: Keep the frontend lightweight with vanilla HTML, CSS, and JS (no bulky UI frameworks).
* **Responsive Design**: Ensure layouts render smoothly across mobile, tablet, and desktop viewports.
* **Clean Commits**: Follow Conventional Commits format (`feat:`, `fix:`, `docs:`, `chore:`).
