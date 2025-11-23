variable "ssh_host" {
  description = "The SSH host IP or hostname"
  type        = string
}

variable "ssh_user" {
  description = "The SSH username"
  type        = string
}

variable "ssh_password" {
  description = "The SSH password"
  type        = string
  sensitive   = true
}



variable "domain_name" {
  description = "The domain name for the application"
  type        = string
  default     = "localhost"
}

variable "github_repository" {
  description = "The GitHub repository (owner/repo) for pulling images"
  type        = string
}

resource "null_resource" "deploy" {
  triggers = {
    always_run = "${timestamp()}"
  }

  connection {
    type     = "ssh"
    user     = var.ssh_user
    password = var.ssh_password
    host     = var.ssh_host
  }

  provisioner "remote-exec" {
    inline = ["mkdir -p /home/${var.ssh_user}/devops-project-1"]
  }

  provisioner "file" {
    source      = "../docker-compose.yml"
    destination = "/home/${var.ssh_user}/devops-project-1/docker-compose.yml"
  }

  provisioner "remote-exec" {
    inline = [
      "export DOMAIN_NAME=${var.domain_name}",
      "export GITHUB_REPOSITORY=${var.github_repository}",
      "cd /home/${var.ssh_user}/devops-project-1",
      "docker compose down",
      "docker compose pull",
      "docker compose up -d"
    ]
  }
}
