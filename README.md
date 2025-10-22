# Personal Portfolio with Automated CI/CD Pipeline

🚀 **Live Demo:** [https://personal-page-devops.onrender.com/](https://personal-page-devops.onrender.com/)

## Overview

A modern, responsive portfolio website showcasing my technical projects and skills, featuring a fully automated CI/CD pipeline that demonstrates practical DevOps expertise.

## 📝 Table of Contents

*   [Overview](#overview)
*   [🛠️ Tech Stack](#️-tech-stack)
*   [✨ Features](#-features)
*   [🔄 CI/CD Pipeline Workflow](#-cicd-pipeline-workflow)
*   [🚀 Local Development](#-local-development)
    *   [Prerequisites](#prerequisites)
    *   [Steps](#steps)
*   [📁 Project Structure](#-project-structure)
*   [🎯 Purpose](#-purpose)
*   [🔧 DevOps Skills Demonstrated](#-devops-skills-demonstrated)
*   [📞 Contact](#-contact)

## 🛠️ Tech Stack

-   **Frontend:** HTML5, CSS3, JavaScript (ES6+)
-   **Containerization:** Docker
-   **CI/CD:** GitHub Actions
-   **Cloud Deployment:** Render
-   **Version Control:** Git

## ✨ Features

-   **Automated Deployment:** Full CI/CD pipeline triggers on every push to main branch
-   **Docker Containerization:** Consistent environment across development and production
-   **Responsive Design:** Optimized for desktop and mobile devices
-   **Project Portfolio:** Centralized showcase of all technical projects
-   **Professional Styling:** Modern UI with smooth animations and interactions

## 🔄 CI/CD Pipeline Workflow

1.  **Code Push** → Trigger GitHub Actions workflow
2.  **Docker Build** → Create containerized application
3.  **Automated Deployment** → Deploy to Render cloud platform
4.  **Health Check** → Verify successful deployment

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

## 🎯 Purpose

This project serves as both:

*   A technical portfolio showcasing my AI, DevOps, and full-stack projects
*   A hands-on demonstration of CI/CD, Docker, and cloud deployment skills
*   A scalable platform for easily adding new projects and updates

## 🔧 DevOps Skills Demonstrated

*   **Infrastructure as Code:** Dockerfile configuration
*   **Continuous Integration:** Automated testing and building
*   **Continuous Deployment:** Automated cloud deployment
*   **Containerization:** Environment consistency
*   **Cloud Platforms:** Render deployment and configuration
*   **Version Control:** Git workflows and branch management

## 🧰 Maintainer

**Artem Rivnyi** — Junior Technical Support / DevOps Enthusiast

* **Email:** [artemrivnyi@outlook.com](mailto:artemrivnyi@outlook.com)  
* 🔗 [LinkedIn](https://www.linkedin.com/in/artem-rivnyi/)  
* 🌐 [Personal Projects](https://personal-page-devops.onrender.com/)  
* 💻 [GitHub](https://github.com/ArtemRivnyi)
