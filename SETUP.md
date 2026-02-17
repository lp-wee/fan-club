# JobPortal Setup Guide

Complete guide for setting up and running the JobPortal full-stack application.

## System Requirements

- **Node.js**: 18.17 or higher
- **pnpm**: 8.0 or higher (or npm/yarn)
- **PostgreSQL**: 13 or higher
- **RAM**: 2GB minimum
- **Disk Space**: 500MB

## Step-by-Step Setup

### 1. Clone/Download Project

```bash
cd /path/to/jobportal
```

### 2. Install Dependencies

```bash
pnpm install
```

This installs:
- Next.js frontend dependencies
- Express backend dependencies
- TypeScript and development tools

### 3. PostgreSQL Database Setup

#### Option A: Local PostgreSQL Installation

**macOS (using Homebrew):**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Windows:**
Download and install from https://www.postgresql.org/download/windows/

#### Create Database

```bash
# Connect to PostgreSQL
psql postgres

# Create database
CREATE DATABASE jobportal;

# Create user (optional but recommended)
CREATE USER jobuser WITH PASSWORD 'jobpass123';
GRANT ALL PRIVILEGES ON DATABASE jobportal TO jobuser;

# Exit psql
\q
```

#### Initialize Schema

```bash
# Run migration script
psql jobportal -f scripts/init-db.sql
```

Or if using a different user:
```bash
psql -U jobuser -d jobportal -f scripts/init-db.sql
```

### 4. Environment Configuration

Create `.env.local` in the project root:

```env
# Frontend API URL (for browser requests)
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Backend API URL (for server-side requests)
API_URL=http://localhost:3001/api

# Database connection string
# Format: postgresql://[user][:password]@[host]:[port]/[database]
DATABASE_URL=postgresql://jobuser:jobpass123@localhost:5432/jobportal

# Server port
PORT=3001

# Environment
NODE_ENV=development
```

**Common DATABASE_URL formats:**

```bash
# Default PostgreSQL user
postgresql://localhost/jobportal

# With custom user
postgresql://jobuser:jobpass123@localhost:5432/jobportal

# With explicit host
postgresql://jobuser:jobpass123@127.0.0.1:5432/jobportal

# For production (with SSL)
postgresql://jobuser:jobpass123@host.com:5432/jobportal?sslmode=require
```

### 5. Run the Application

#### Option A: Run Both Frontend & Backend Together

```bash
pnpm dev
```

This runs:
- **Next.js Frontend** on http://localhost:3000
- **Express Backend** on http://localhost:3001

Watch the terminal for both services to start successfully.

#### Option B: Run Services Separately

**Terminal 1 - Frontend:**
```bash
cd /path/to/project
next dev
```

**Terminal 2 - Backend:**
```bash
cd /path/to/project
pnpm server
```

### 6. Verify Installation

**Check Frontend:**
- Open browser: http://localhost:3000
- You should see the JobPortal homepage

**Check Backend:**
```bash
curl http://localhost:3001/api/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-02-16T10:30:00.000Z"
}
```

**Check API Connectivity:**
```bash
curl http://localhost:3001/api/vacancies
```

Should return JSON array of vacancies (initially empty).

## Troubleshooting

### Port Already in Use

If port 3000 or 3001 is already in use:

```bash
# Kill process on port 3000 (macOS/Linux)
lsof -ti:3000 | xargs kill -9

# Kill process on port 3001 (macOS/Linux)
lsof -ti:3001 | xargs kill -9

# For Windows, use Task Manager or:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

Or change ports in `.env.local`:
```env
PORT=3002  # Change backend port
```

And update frontend configuration.

### Database Connection Error

If you get `ECONNREFUSED` or `FATAL: role does not exist`:

1. Verify PostgreSQL is running:
```bash
# macOS
brew services list

# Linux
sudo systemctl status postgresql

# Windows
Check Services application for PostgreSQL service
```

2. Check DATABASE_URL is correct:
```bash
psql $DATABASE_URL
```

3. Re-initialize schema:
```bash
psql jobportal -f scripts/init-db.sql
```

### Dependencies Installation Failed

```bash
# Clear cache and reinstall
pnpm install --force

# Or use npm/yarn
npm install --legacy-peer-deps
yarn install
```

### TypeScript Errors

```bash
# Rebuild project
pnpm build

# Generate types
pnpm dev
```

## Development Workflow

### Making Changes

1. **Frontend Changes**: Auto-reload on file save (http://localhost:3000)
2. **Backend Changes**: Use `tsx watch` for auto-restart (changes to `server/` folder)

### Adding Database Migrations

Create new SQL file in `scripts/` directory:
```sql
-- scripts/02-add-new-table.sql
ALTER TABLE vacancies ADD COLUMN new_field VARCHAR(255);
```

Run migration:
```bash
psql jobportal -f scripts/02-add-new-table.sql
```

### Testing API Endpoints

Using curl:
```bash
# Get all vacancies
curl http://localhost:3001/api/vacancies

# Get single vacancy
curl http://localhost:3001/api/vacancies/1

# Create vacancy (POST)
curl -X POST http://localhost:3001/api/vacancies \
  -H "Content-Type: application/json" \
  -d '{
    "company_id": 1,
    "title": "React Developer",
    "description": "Looking for experienced React developer",
    "salary_min": 80000,
    "salary_max": 120000,
    "employment_type": "full_time",
    "experience_level": "mid"
  }'
```

Or use Postman/Insomnia for interactive testing.

## Production Deployment

### Pre-deployment Checklist

- [ ] Update `.env.local` with production values
- [ ] Set `NODE_ENV=production`
- [ ] Configure production database URL
- [ ] Run database migrations
- [ ] Build frontend: `pnpm build`
- [ ] Test in production mode: `pnpm start`

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### Deploy Backend Separately

Backend can be deployed to:
- Heroku
- Railway
- Render
- AWS EC2/Lambda
- Google Cloud Run
- DigitalOcean

## Performance Tips

1. **Database**: Create indexes for frequently queried fields (already in schema)
2. **Caching**: Implement Redis for session/cache layer
3. **API**: Add rate limiting and pagination
4. **Frontend**: Use Next.js Image optimization
5. **Monitoring**: Add error tracking (Sentry, LogRocket)

## Next Steps

1. Create test accounts and explore features
2. Review API endpoints in `server/index.ts`
3. Customize branding in `components/layout/Header.tsx`
4. Add additional features as needed
5. Deploy to production

## Support & Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Express Docs**: https://expressjs.com
- **PostgreSQL Docs**: https://www.postgresql.org/docs
- **TypeScript Docs**: https://www.typescriptlang.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
