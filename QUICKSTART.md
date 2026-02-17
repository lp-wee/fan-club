# JobPortal - Quick Start Guide

Get JobPortal running in 5 minutes!

## Prerequisites

- Node.js 18+
- PostgreSQL 13+
- pnpm (or npm/yarn)

## 1. Setup Database (2 min)

```bash
# Create database
createdb jobportal

# Initialize schema
psql jobportal -f scripts/init-db.sql

# Add sample data
psql jobportal -f scripts/seed-data.sql
```

## 2. Configure Environment (1 min)

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
API_URL=http://localhost:3001/api
DATABASE_URL=postgresql://localhost/jobportal
PORT=3001
NODE_ENV=development
```

## 3. Install & Run (2 min)

```bash
# Install dependencies
pnpm install

# Start everything
pnpm dev
```

Now open:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001/api/health

## Test It

1. Go to http://localhost:3000/vacancies
2. See all 10 sample jobs
3. Click on any job to see details
4. Try the filters (location, salary, etc.)

## Login

Use any of these accounts:

```
admin@jobportal.com / hashed_password_123
tech@techcorp.com / hashed_password_123  
alice@gmail.com / hashed_password_123
```

## What Works

✅ Browse vacancies with filtering
✅ View job details
✅ Company profiles
✅ Responsive design (mobile/tablet/desktop)
✅ Modern UI with dark mode support
✅ Full Express API backend
✅ Real PostgreSQL database

## Architecture

- **Frontend**: Next.js 16 + React 19 + TypeScript
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL
- **API**: RESTful with 15+ endpoints

## API Endpoints

```
GET    /api/vacancies              - List jobs with filters
GET    /api/vacancies/:id          - Get job details
GET    /api/applications           - List applications
POST   /api/applications           - Submit application
GET    /api/saved-jobs/:id         - Get saved jobs
POST   /api/saved-jobs/:id/:vid    - Save/unsave job
GET    /api/companies/:id          - Company details
GET    /api/health                 - API health check
```

## Troubleshooting

**Port in use?**
```bash
lsof -ti:3000 | xargs kill -9  # Kill frontend
lsof -ti:3001 | xargs kill -9  # Kill backend
```

**Database error?**
```bash
# Check PostgreSQL status
psql postgres -c "SELECT version();"

# Re-init database
psql jobportal -f scripts/init-db.sql
```

**API not connecting?**
Check Backend logs - ensure `pnpm dev` starts without errors

## Next Steps

1. Review `/SETUP.md` for detailed configuration
2. Check `/README.md` for full feature list
3. Explore API in `server/index.ts`
4. Browse code in `/app` and `/components`

## Docs

- [Full Setup Guide](./SETUP.md)
- [Complete README](./README.md)
- [Next.js Docs](https://nextjs.org/docs)
- [Express Docs](https://expressjs.com)
- [PostgreSQL Docs](https://www.postgresql.org/docs)

Happy coding! 🚀
