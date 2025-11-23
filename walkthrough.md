# DevOps Learning Project Walkthrough

## Overview
This project is a complete DevOps learning playground featuring a Next.js frontend, Flask backend, Docker containerization, Traefik reverse proxy, and Infrastructure as Code (IaC) with Terraform and Ansible.

## Architecture
- **Frontend**: Next.js 14 (App Router) with Tailwind CSS and Framer Motion.
- **Backend**: Flask API with Prometheus metrics.
- **Proxy**: Nginx (Host-based) handling Reverse Proxy and SSL.
- **Infrastructure**: Docker Compose, Terraform (SSH Password), Ansible (Nginx/Certbot).

## Prerequisites
- Docker & Docker Compose installed locally.
- A VPS with SSH access (Password Auth).
- GitHub Account (for CI/CD).

## Local Development
1. **Start the Stack**:
   ```bash
   docker compose up -d --build
   ```
2. **Access the App**:
   - Frontend: `http://localhost:57001`
   - Backend API: `http://localhost:57001/api/data` (proxied)

## CI/CD & Deployment
### GitHub Actions
- **Backend CI**: Lints and tests Python code.
- **Frontend CI**: Lints and builds Next.js app.
- **Secrets**: Configure `SSH_PASSWORD`, `DOMAIN_NAME`, etc.

### Deployment Workflow
1. **Configure Server (Ansible)**:
   Installs Docker, Nginx, Certbot and configures SSL.
   ```bash
   ansible-playbook -i ansible/inventory.ini ansible/playbook.yml
   ```
2. **Deploy App (Terraform)**:
   Deploys Docker containers via SSH.
   ```bash
   cd terraform
   terraform init
   terraform apply
   ```

## 4. Monitoring Stack Implementation

### Architecture
- **Prometheus**: Scrapes metrics from `backend:5000/metrics` and `devops1.himanmanduja.fun/metrics`.
- **Grafana**: Visualizes metrics with a pre-built dashboard.
- **Exporters**: Custom Prometheus instrumentation in Flask backend (`prometheus_client`).

### Verification
1. **Metrics Endpoint**:
   - Local: `curl http://localhost:57001/metrics`
   - VPS: `curl https://devops1.himanmanduja.fun/metrics`
   - Verified presence of `http_requests_total` and `http_request_duration_seconds`.

2. **Prometheus Targets**:
   - Accessed `http://localhost:9090/targets`.
   - Confirmed `flask-backend-local` is **UP**.
   - Confirmed `flask-backend-production` is **UP** (after VPS deployment).

3. **Grafana Dashboard**:
   - Accessed `http://localhost:3001`.
   - Verified "Flask Backend Metrics" dashboard shows:
     - Request Rate
     - Response Time
     - Traffic distribution by endpoint

![Final Grafana Dashboard](file:///C:/Users/mandu/.gemini/antigravity/brain/43b3f9a9-024f-419b-8407-39d58ff438be/final_dashboard_success_1763678186402.png)

## Verification Results
- **Frontend**: Verified accessible at `http://localhost`. Animations working.
- **Backend**: Verified API response at `http://localhost/api/data`.
- **Metrics**: Verified Prometheus metrics at `http://localhost/metrics`.
