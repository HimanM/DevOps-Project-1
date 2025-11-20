# Setup Guide

This guide explains how to configure and run the Infrastructure as Code (IaC) tools for this project.

## Prerequisites

Ensure you have the following installed on your local machine:
- [Terraform](https://developer.hashicorp.com/terraform/install)
- [Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html)

## 1. Ansible Configuration

Ansible is used to configure the server (install Docker, Nginx, Certbot) and set up the reverse proxy.

1.  Navigate to the `ansible` directory:
    ```bash
    cd ansible
    ```
2.  Edit `inventory.ini` with your VPS details:
    ```ini
    [servers]
    <YOUR_VPS_IP> ansible_user=root ansible_password=<YOUR_SSH_PASSWORD> domain_name=<YOUR_DOMAIN> frontend_port=57001
    ```
    *Note: For better security, consider using `ansible-vault` for passwords.*

3.  Run the playbook:
    ```bash
    ansible-playbook -i inventory.ini playbook.yml
    ```

## 2. Terraform Deployment

Terraform is used to deploy the application containers (Docker Compose) to the VPS.

1.  Navigate to the `terraform` directory:
    ```bash
    cd terraform
    ```
2.  Create a `terraform.tfvars` file based on the example:
    ```bash
    cp terraform.tfvars.example terraform.tfvars
    ```
3.  Edit `terraform.tfvars` with your details:
    ```hcl
    ssh_host     = "<YOUR_VPS_IP>"
    ssh_user     = "root"
    ssh_password = "<YOUR_SSH_PASSWORD>"
    domain_name  = "<YOUR_DOMAIN>"
    ```
4.  Initialize Terraform:
    ```bash
    terraform init
    ```
5.  Apply the configuration:
    ```bash
    terraform apply
    ```
    Type `yes` when prompted.

## 3. GitHub Actions

To enable CI/CD and Infrastructure Automation, configure the following **Secrets** in your GitHub repository settings:

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `SSH_HOST` | IP address of your VPS | `192.168.1.100` |
| `SSH_USER` | SSH username | `root` |
| `SSH_PASSWORD` | SSH password | `MySecretPass123!` |
| `DOMAIN_NAME` | Domain name for the app | `example.com` |
| `BACKEND_URL` | Internal Backend URL | `http://backend:5000` |

### Workflows
- **CI (Push)**: Runs tests and builds on every push.
- **Infrastructure Setup (Manual)**: Go to "Actions" -> "Infrastructure Setup" -> "Run workflow" to provision the server (install Docker, Nginx) and deploy the app. **Run this once** or when infra changes.
