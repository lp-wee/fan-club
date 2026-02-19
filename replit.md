# JobPortal

## Overview
A Russian-language job portal application built with Next.js (frontend) and Express (backend API). Users can browse vacancies, apply for jobs, manage resumes, and employers can post vacancies and review applications.

## Architecture
- **Frontend**: Next.js 16 with React 19, Tailwind CSS, shadcn/ui components
- **Backend**: Express.js API server on port 3001
- **Database**: PostgreSQL (Replit-managed)
- **Language**: TypeScript

## Project Structure
- `app/` - Next.js app router pages
- `components/` - React components (ui/, layout/, jobs/, applications/)
- `lib/` - Utilities, API client, types, localization
- `server/` - Express backend API
- `scripts/` - Database init and seed scripts
- `hooks/` - Custom React hooks
- `styles/` - Global styles

## How to Run
- `npm run dev` - Starts both Next.js (port 5000) and Express API (port 3001)
- Next.js proxies `/api/*` requests to Express via rewrites in `next.config.mjs`

## Database
- Schema defined in `scripts/init-db.sql`
- Seed data in `scripts/seed-data.sql`
- Tables: users, companies, job_seekers, vacancies, resumes, applications, saved_jobs, messages, reviews

## Key Configuration
- Next.js runs on port 5000, bound to 0.0.0.0
- Express API runs on port 3001
- API client uses relative `/api` URLs (proxied through Next.js rewrites)
- `allowedDevOrigins: ['*']` in next.config.mjs for Replit iframe compatibility
