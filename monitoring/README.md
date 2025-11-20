# Monitoring Stack

This directory contains the configuration for Prometheus and Grafana monitoring.

## Quick Start

### Local Development

```bash
# Start the monitoring stack
docker compose -f docker-compose.monitoring.yml up -d

# Access the services
# - Prometheus: http://localhost:9090
# - Grafana: http://localhost:3001 (admin/admin)
# - Frontend: http://localhost:57001
```

### Access Grafana

1. Open http://localhost:3001
2. Login with:
   - Username: `admin`
   - Password: `admin`
3. Navigate to Dashboards → Flask Backend Metrics

## What's Monitored

The Flask backend exposes Prometheus metrics at `/metrics`:

- **Request Rate**: Requests per second by endpoint
- **Response Time**: Average response time in milliseconds
- **Request Count**: Total number of requests by endpoint
- **HTTP Methods**: Distribution of GET/POST requests

## Configuration Files

- `prometheus.yml`: Prometheus scrape configuration
- `grafana/provisioning/datasources/`: Auto-configured Prometheus datasource
- `grafana/provisioning/dashboards/`: Pre-built Flask dashboard

## Customization

### Add More Metrics

Edit `backend/app.py` to add custom metrics using the Prometheus client library.

### Modify Dashboard

1. Open Grafana
2. Edit the "Flask Backend Metrics" dashboard
3. Save changes (they'll persist in the `grafana-data` volume)

### Change Scrape Interval

Edit `prometheus.yml` and change `scrape_interval` value.

## Production Deployment

For production, you should:

1. Change Grafana admin password (set `GF_SECURITY_ADMIN_PASSWORD` env var)
2. Add authentication to Prometheus
3. Use persistent volumes for data retention
4. Configure alerting rules in Prometheus
5. Set up Grafana SMTP for email alerts
