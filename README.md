# Personal Portfolio with Automated CI/CD Pipeline

[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, responsive **portfolio website** showcasing my technical projects and skills, featuring a fully automated **CI/CD pipeline** that demonstrates practical DevOps expertise. The site is hosted on **Render** for a zero-downtime deployment experience.

## 📝 Table of Contents

*   [🎯 Project Goals](#-project-goals)
*   [🛠️ Tech Stack](#️-tech-stack)
*   [✨ Features](#-features)
*   [🔄 CI/CD Pipeline Workflow](#-cicd-pipeline-workflow)
*   [🚀 Local Development](#-local-development)
    *   [Prerequisites](#prerequisites)
    *   [Steps](#steps)
*   [📁 Project Structure](#-project-structure)
*   [🔧 DevOps Skills Demonstrated](#-devops-skills-demonstrated)
*   [🌐 Live Demo](#-live-demo)
*   [🤝 Contributing](#-contributing)
*   [🧰 Maintainer](#-maintainer)

## 🎯 Project Goals

*   **Showcase Technical Skills**: Provide a professional, interactive platform to present projects.
*   **Demonstrate DevOps Mastery**: Implement a robust, automated CI/CD workflow from commit to deployment.
*   **Responsive Design**: Ensure optimal viewing experience across all devices (desktop, tablet, mobile).
*   **Zero-Downtime Deployment**: Utilize modern hosting solutions (Render) for seamless updates.
  
## 🛠️ Tech Stack

-   **Frontend:** HTML5, CSS3, JavaScript (ES6+)
-   **Containerization:** Docker
-   **CI/CD:** GitHub Actions
-   **Cloud Deployment:** Render
-   **Version Control:** Git, GitHub

## ✨ Features

-   **Automated Deployment:** Full CI/CD pipeline triggers on every push to main branch
-   **Docker Containerization:** Consistent environment across development and production
-   **Responsive Design:** Optimized for desktop and mobile devices
-   **Project Portfolio:** Centralized showcase of all technical projects
-   **Professional Styling:** Modern UI with smooth animations and interactions
-   **Zero-Downtime Updates**: Seamless deployment experience on Render

## 🔄 CI/CD Pipeline Workflow

1.  **Code Push** → Trigger GitHub Actions workflow
2.  **Docker Build** → Create containerized application
3.  **Automated Deployment** → Deploy to Render cloud platform
4.  **Health Check** → Verify successful deployment

### Automated Process

The deployment process is fully automated using **GitHub Actions** and **Render**:

*   **Commit & Push**: Changes pushed to the `main` branch trigger the pipeline
*   **CI Trigger**: GitHub Actions runs validation checks
*   **CD Trigger**: Render automatically detects repository changes
*   **Build & Deploy**: Render pulls latest code and deploys with zero downtime
  
## 🚀 Local Development

### Prerequisites

-   Docker installed on your machine

### Steps

```bash
# Clone the repository
git clone https://github.com/ArtemRivnyi/personal-page-devops.git
cd personal-page-devops

# Build Docker image
docker build -t personal-portfolio .

# Run container
docker run -p 80:80 personal-portfolio

# Visit http://localhost to view the site
```

**Without Docker:**
Simply open `index.html` in your browser for local development.

## 📁 Project Structure

```text
personal-page-devops/
├── .github/workflows/
│   └── cicd.yml           # GitHub Actions configuration
├── index.html             # Main portfolio page
├── style.css              # Responsive styles and animations
├── script.js              # Interactive functionality
├── Dockerfile             # Container configuration
├── .dockerignore          # Docker ignore rules
└── Rivnyi_Artem_Tech_Support_CV.pdf  # Downloadable resume
```
## 🔧 DevOps Skills Demonstrated

*   **Infrastructure as Code:** Dockerfile configuration
*   **Continuous Integration:** Automated testing and building
*   **Continuous Deployment:** Automated cloud deployment
*   **Containerization:** Environment consistency
*   **Cloud Platforms:** Render deployment and configuration
*   **Version Control:** Git workflows and branch management

## 🌐 Live Demo
The live version of the portfolio is available here:

👉 https://personal-page-devops.onrender.com/

## 🤝 Contributing
This is a personal portfolio project, but suggestions for improvements to the CI/CD pipeline or code structure are welcome.

## 🧰 Maintainer

**Artem Rivnyi** — Junior Technical Support / DevOps Enthusiast

* 📧 [artemrivnyi@outlook.com](mailto:artemrivnyi@outlook.com)  
* 🔗 [LinkedIn](https://www.linkedin.com/in/artem-rivnyi/)  
* 🌐 [Personal Projects](https://personal-page-devops.onrender.com/)  
* 💻 [GitHub](https://github.com/ArtemRivnyi)
