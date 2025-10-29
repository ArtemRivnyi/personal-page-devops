# Personal Portfolio with Automated CI/CD Pipeline

[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/features/actions)
[![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, responsive **portfolio website** showcasing technical projects and skills, featuring a robust and fully automated **Continuous Integration/Continuous Deployment (CI/CD) pipeline**. This project serves as a practical demonstration of DevOps expertise, ensuring a consistent environment through Docker and seamless, zero-downtime deployment via Render.

## 📝 Table of Contents

*   [🎯 Project Goals](#-project-goals)
*   [🛠️ Tech Stack](#️-tech-stack)
*   [✨ Key Features](#-key-features)
*   [🔄 CI/CD Pipeline Workflow](#-cicd-pipeline-workflow)
*   [🚀 Local Development](#-local-development)
    *   [Prerequisites](#prerequisites)
    *   [Running with Docker](#running-with-docker)
    *   [Running Locally (Without Docker)](#running-locally-without-docker)
*   [🧪 Automated Testing and Validation](#-automated-testing-and-validation)
*   [📁 Project Structure](#-project-structure)
*   [🌐 Live Demo](#-live-demo)
*   [🤝 Contributing](#-contributing)
*   [📄 License](#-license)
*   [🧰 Maintainer](#-maintainer)

## 🎯 Project Goals

The primary objectives of this project are:

| Goal | Description | Value Proposition |
| :--- | :--- | :--- |
| **Showcase Technical Skills** | Provide a professional, interactive platform to present projects and expertise. | Establishes credibility and serves as a dynamic resume. |
| **Demonstrate DevOps Mastery** | Implement a robust, automated CI/CD workflow from commit to production. | Proves hands-on experience with modern DevOps practices. |
| **Ensure Environment Consistency** | Utilize Docker to containerize the application. | Guarantees that the application runs reliably across all environments (Dev, CI, Prod). |
| **Zero-Downtime Deployment** | Leverage modern cloud services (Render) for seamless updates. | Ensures high availability and a professional user experience. |

## 🛠️ Tech Stack

This project is built and maintained using the following core technologies:

| Category | Technologies | Description |
| :--- | :--- | :--- |
| **Frontend** | HTML5, CSS3, JavaScript (ES6+) | Standard web technologies for structure, styling, and interactivity. |
| **Containerization** | Docker, `Dockerfile` | Ensures a consistent, isolated environment for the application. |
| **CI/CD** | GitHub Actions | Automates the build, test, and deployment process upon code changes. |
| **Deployment** | Render | Cloud platform used for continuous, zero-downtime hosting. |
| **Testing** | Jest, ESLint, Stylelint, HTML-Validate | Tools for unit testing, code quality, and style conformity. |
| **Version Control** | Git, GitHub | Standard workflow for collaborative development and source control. |

## ✨ Key Features

*   **Automated Deployment:** A full CI/CD pipeline triggers on every push to the `main` branch, ensuring rapid iteration.
*   **Containerization:** The application is packaged in a Docker container, guaranteeing environment parity.
*   **Responsive Design:** Optimized for optimal viewing and interaction across desktop, tablet, and mobile devices.
*   **Code Quality Gates:** Automated linting (ESLint, Stylelint) and validation (HTML-Validate) enforce high code standards.
*   **Unit Testing:** JavaScript functionality is covered by Jest unit tests.
*   **Zero-Downtime Updates:** Seamless deployment experience on Render via automated webhook integration.

## 🔄 CI/CD Pipeline Workflow

The deployment process is fully automated using **GitHub Actions** for continuous integration and **Render** for continuous deployment.

1.  **Code Push**: Changes are pushed to the `main` branch.
2.  **GitHub Actions (CI)**:
    *   Runs `npm run ci` which executes validation (`lint`, `stylelint`, `html-validate`) and unit tests (`npm test`).
    *   If tests pass, the pipeline proceeds.
3.  **Docker Build**: The application is built into a Docker image.
4.  **Render (CD)**:
    *   Render automatically detects the new commit via webhook.
    *   It pulls the latest code, builds the image, and deploys the new container.
5.  **Health Check**: The new service is verified, and the old instance is seamlessly replaced (zero-downtime).

## 🚀 Local Development

### Prerequisites

You must have the following tools installed on your system:

*   **Docker**
*   **Node.js** (v18.0.0 or higher) and **npm** (v9.0.0 or higher) for local validation and testing.

### Running with Docker

The fastest way to run the project is using the provided `Dockerfile` and `nginx.conf`.

```bash
# 1. Build the Docker image
docker build -t personal-portfolio .

# 2. Run the container, mapping port 80 to localhost:80
docker run -d -p 80:80 personal-portfolio

# 3. Access the site
# Visit http://localhost in your web browser
```

### Running Locally (Without Docker)

For quick development and testing:

```bash
# Simply open index.html in your web browser
```

## 🧪 Automated Testing and Validation

The project includes a comprehensive set of scripts for quality assurance, which are run automatically by the CI pipeline.

| Script | Command | Purpose |
| :--- | :--- | :--- |
| **Unit Tests** | `npm test` | Executes Jest tests for JavaScript functionality. |
| **Code Linting** | `npm run lint` | Checks JavaScript code for errors and style issues (using ESLint). |
| **Style Linting** | `npm run stylelint` | Checks CSS for style conformity (using Stylelint). |
| **HTML Validation** | `npm run html-validate` | Ensures `index.html` adheres to web standards. |
| **Full CI Check** | `npm run ci` | Runs all validation and test scripts sequentially. |

## 📁 Project Structure

The repository maintains a clean and focused structure:

```
personal-page-devops/
├── .github/workflows/
│   └── cicd.yml           # GitHub Actions configuration for CI/CD
├── index.html             # Main portfolio page (HTML)
├── style.css              # Application styles (CSS)
├── script.js              # Interactive functionality (JavaScript)
├── Dockerfile             # Container configuration
├── docker-compose.yml     # Optional: Defines multi-container environment
├── nginx.conf             # Nginx configuration for the container
├── package.json           # Project dependencies and scripts
├── Rivnyi_Artem_Tech_Support_CV.pdf  # Downloadable resume
├── tests/                 # Directory for Jest unit tests
└── ... (config files)     # jest.config.js, eslint.config.mjs, etc.
```

## 🌐 Live Demo

The live version of the portfolio is available here:

👉 [https://personal-page-devops.onrender.com/](https://personal-page-devops.onrender.com/)

## 🤝 Contributing

This is a personal portfolio project, but suggestions for improvements to the CI/CD pipeline, code structure, or documentation are welcome.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🧰 Maintainer

**Artem Rivnyi** — Junior Technical Support / DevOps Enthusiast

* 📧 [artemrivnyi@outlook.com](mailto:artemrivnyi@outlook.com)  
* 🔗 [LinkedIn](https://www.linkedin.com/in/artem-rivnyi/)  
* 🌐 [Personal Projects](https://personal-page-devops.onrender.com/)  
* 💻 [GitHub](https://github.com/ArtemRivnyi)
