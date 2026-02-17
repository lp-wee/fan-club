# JobPortal Deployment Guide

Complete guide for deploying JobPortal to production.

## Pre-Deployment Checklist

- [ ] Build and test locally: `pnpm build && pnpm start`
- [ ] Update environment variables for production
- [ ] Configure production database
- [ ] Set up CORS for production domain
- [ ] Configure SSL/TLS certificates
- [ ] Set up monitoring and logging
- [ ] Create backups of database
- [ ] Test all critical user flows
- [ ] Update API endpoints in frontend config

## Deployment Options

### Option 1: Vercel (Recommended for Frontend)

Vercel is optimized for Next.js and provides seamless deployment.

#### Frontend Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd /path/to/jobportal
vercel

# Set environment variables in dashboard
NEXT_PUBLIC_API_URL=https://api.jobportal.com/api
API_URL=https://api.jobportal.com/api
```

#### Configuration

Create `vercel.json`:
```json
{
  "buildCommand": "pnpm build",
  "installCommand": "pnpm install",
  "outputDirectory": ".next",
  "env": {
    "NEXT_PUBLIC_API_URL": "@api_url",
    "API_URL": "@api_url"
  }
}
```

### Option 2: Railway (Full Stack)

Railway makes it easy to deploy both frontend and backend.

#### Frontend Setup

```bash
# Create Railway project from GitHub
# Connect your repository
# Set environment variables:
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api-jobportal.railway.app/api
```

#### Backend Setup

```bash
# In Railway dashboard:
# 1. Add PostgreSQL database
# 2. Create Node.js service
# 3. Set environment variables:
DATABASE_URL=${{Postgres.DATABASE_URL}}
NODE_ENV=production
PORT=3001
```

### Option 3: AWS

#### Using EC2 + RDS

**1. Launch EC2 Instance**
```bash
# Ubuntu 22.04 LTS recommended
# t3.micro or larger
# Security group: Allow ports 22, 80, 443, 3000, 3001
```

**2. Setup Server**
```bash
# SSH into instance
ssh -i key.pem ubuntu@your-instance-ip

# Install Node.js
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install pnpm
sudo npm install -g pnpm

# Clone repository
git clone https://github.com/yourrepo/jobportal.git
cd jobportal
pnpm install
```

**3. Setup PostgreSQL RDS**
```bash
# Create RDS instance through AWS Console
# Note the endpoint, username, password
# Update DATABASE_URL in .env
```

**4. Run with PM2**
```bash
# Install PM2
sudo npm install -g pm2

# Create ecosystem.config.js
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [
    {
      name: 'jobportal-web',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
      }
    },
    {
      name: 'jobportal-api',
      script: 'server/index.ts',
      exec_mode: 'cluster',
      instances: 2,
      env: {
        NODE_ENV: 'production',
        DATABASE_URL: process.env.DATABASE_URL,
      }
    }
  ]
};
EOF

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

**5. Setup Nginx as Reverse Proxy**
```bash
sudo apt install nginx

# Create nginx config
sudo tee /etc/nginx/sites-available/jobportal > /dev/null <<EOF
upstream frontend {
  server localhost:3000;
}

upstream api {
  server localhost:3001;
}

server {
  listen 80;
  server_name jobportal.com www.jobportal.com;

  # Frontend
  location / {
    proxy_pass http://frontend;
    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
  }

  # API
  location /api/ {
    proxy_pass http://api;
    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
  }
}
EOF

# Enable config
sudo ln -s /etc/nginx/sites-available/jobportal /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

**6. Setup SSL with Let's Encrypt**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d jobportal.com -d www.jobportal.com
sudo systemctl restart nginx
```

### Option 4: DigitalOcean

#### App Platform (Easiest)

1. Connect GitHub repository
2. Create two services:
   - Web (Next.js)
   - API (Node.js)
3. Create database (PostgreSQL)
4. Set environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://api.jobportal.com
   DATABASE_URL=<from managed database>
   NODE_ENV=production
   ```
5. Deploy

#### Droplet + App Platform Database

```bash
# Create droplet (2GB RAM recommended)
# SSH in and follow AWS EC2 setup steps
```

### Option 5: Render

Render provides free tier for testing.

1. Push to GitHub
2. Create web service from repository
3. Set build command: `pnpm install && pnpm build`
4. Set start command: `pnpm start`
5. Add environment variables
6. Create PostgreSQL database
7. Deploy

## Database Migration for Production

### 1. Create Production Database

```bash
# On production server
createdb jobportal_prod

# Or use managed database from provider
```

### 2. Run Schema Migration

```bash
psql $DATABASE_URL -f scripts/init-db.sql
```

### 3. Seed Initial Data (Optional)

```bash
psql $DATABASE_URL -f scripts/seed-data.sql
```

### 4. Verify Data

```bash
psql $DATABASE_URL

# Check tables
\dt

# Check data
SELECT COUNT(*) FROM vacancies;
SELECT COUNT(*) FROM users;
```

## Environment Variables for Production

Create `.env.production` or set in deployment platform:

```env
# Frontend
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api

# Backend
API_URL=https://api.yourdomain.com/api
DATABASE_URL=postgresql://user:password@host:5432/jobportal_prod
PORT=3001

# Security (optional)
JWT_SECRET=your-secret-key-here
CORS_ORIGIN=https://yourdomain.com
```

## Monitoring & Logging

### Option 1: Datadog

```bash
# Install Datadog agent
DD_AGENT_MAJOR_VERSION=7 DD_API_KEY=$YOUR_API_KEY DD_SITE="datadoghq.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent-scripts/install_script.sh)"

# Enable application monitoring
# Setup dashboards for:
# - Request count and latency
# - Database query performance
# - Error rates
# - User activity
```

### Option 2: New Relic

```bash
npm install newrelic

# In server/index.ts, add at top:
require('newrelic');

# Configure newrelic.js
# Monitor:
# - Application performance
# - Server metrics
# - Database performance
```

### Option 3: Self-hosted ELK Stack

Set up Elasticsearch, Logstash, Kibana for logs.

## Backup & Disaster Recovery

### Database Backups

```bash
# Daily automated backup with cron
0 2 * * * /usr/bin/pg_dump jobportal_prod | gzip > /backups/jobportal_$(date +\%Y\%m\%d).sql.gz
```

### Restore from Backup

```bash
gunzip < backup.sql.gz | psql jobportal_prod
```

## Performance Optimization

### 1. Database

```sql
-- Create indexes for common queries
CREATE INDEX idx_vacancies_status ON vacancies(is_active);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_users_email ON users(email);

-- Analyze query performance
EXPLAIN ANALYZE SELECT * FROM vacancies WHERE is_active = true LIMIT 10;
```

### 2. Caching

Add Redis for caching:

```bash
npm install redis
```

### 3. CDN

Use Cloudflare or AWS CloudFront for:
- Static assets
- API response caching
- DDoS protection

## Security Hardening

### 1. HTTPS

- Use Let's Encrypt (free)
- Auto-renew certificates
- Set HSTS header

### 2. API Security

```bash
# Add rate limiting
npm install express-rate-limit

# Add helmet for security headers
npm install helmet
```

### 3. Database Security

```sql
-- Create read-only user for app
CREATE USER jobportal_app WITH PASSWORD 'strong-password';
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO jobportal_app;
```

### 4. Environment Variables

- Never commit `.env` files
- Use secrets management (AWS Secrets Manager, Vault)
- Rotate credentials regularly

## Continuous Deployment

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Install dependencies
        run: npm install -g pnpm && pnpm install
      
      - name: Build
        run: pnpm build
      
      - name: Deploy to Vercel
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
        run: vercel --prod
```

## Monitoring Checklist

- [ ] CPU usage < 80%
- [ ] Memory usage < 80%
- [ ] Database connections < max
- [ ] API response time < 200ms
- [ ] Error rate < 0.1%
- [ ] Uptime > 99.9%
- [ ] Daily backups verified

## Rollback Procedure

If something goes wrong:

```bash
# Revert to previous version
git revert <commit-hash>
git push origin main

# Redeploy
vercel --prod

# Or restore database backup
psql jobportal_prod < backup.sql
```

## Common Issues

### Connection Timeout
- Check database connection string
- Verify firewall rules
- Check database status

### Out of Memory
- Increase server RAM
- Add caching layer (Redis)
- Optimize database queries

### Slow API Responses
- Add database indexes
- Enable query caching
- Check for N+1 queries
- Profile with monitoring tools

## Support

For deployment issues:
- Check server logs: `journalctl -u jobportal`
- Check database logs: `pg_dump --schema-only`
- Monitor with chosen tool (Datadog, New Relic, etc.)
- Review error tracking (Sentry, etc.)

---

Choose the deployment option that best fits your needs. Vercel + external API hosting is simplest, while AWS gives maximum control.

**Good luck with your deployment! 🚀**
