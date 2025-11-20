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

  provisioner "file" {
    source      = "../docker-compose.yml"
    destination = "/home/${var.ssh_user}/docker-compose.yml"
  }


  provisioner "remote-exec" {
    inline = [
      "export DOMAIN_NAME=${var.domain_name}",
      "docker compose down",
      "docker compose up -d --build"
    ]
  }
}
