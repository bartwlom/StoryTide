# Blogging Website Setup Guide

## Quick Start

### 1. Database Setup

You have two options:

#### Option A: Local PostgreSQL
```bash
# Install PostgreSQL (if not installed)
# Ubuntu/Debian:
sudo apt-get install postgresql postgresql-contrib

# Start PostgreSQL service
sudo systemctl start postgresql

# Create database
sudo -u postgres psql
CREATE DATABASE blogging_db;
CREATE USER your_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE blogging_db TO your_user;
\q
```

#### Option B: Cloud Database (Recommended for Development)
- **Neon** (Free): https://neon.tech
- **Supabase** (Free): https://supabase.com
- **Railway** (Free tier): https://railway.app

Get connection string and update `.env` and `.dev.vars`

### 2. Update Environment Variables

Edit `backend/.dev.vars`:
```bash
DATABASE_URL="your_actual_database_connection_string"
JWT_SECRET="your-secret-key-at-least-32-characters-long"
```

### 3. Run Database Migrations

```bash
cd backend
npx prisma migrate dev --name init
```

This will:
- Create the database tables (User, blog)
- Generate Prisma Client

### 4. Start Backend Server

```bash
cd backend
npm run dev
```

Backend will run on: `http://localhost:8787`

### 5. Start Frontend (in a new terminal)

```bash
cd frontend
npm run dev
```

Frontend will run on: `http://localhost:5174`

### 6. Use the Website

1. Go to `http://localhost:5174`
2. Click "Sign up" or go to `/signup`
3. Create an account
4. Go to `/publish` to create your first blog post
5. View all blogs at `/blogs`

## Troubleshooting

### Backend not connecting to database?
- Check your DATABASE_URL in `.dev.vars`
- Make sure PostgreSQL is running: `sudo systemctl status postgresql`
- Test connection: `psql $DATABASE_URL`

### Frontend shows "No blogs found"?
- This is normal if you haven't created any blogs yet
- Make sure backend is running on port 8787
- Check browser console for errors

### Port conflicts?
- Backend default: 8787 (Wrangler)
- Frontend default: 5174 (Vite)
- Change in `wrangler.jsonc` or `vite.config.ts` if needed

## File Structure

```
backend/
  .dev.vars          # Environment variables for Wrangler
  .env               # Environment variables (for Prisma)
  prisma/
    schema.prisma    # Database schema
  src/
    index.ts        # Main server file
    routes/          # API routes

frontend/
  src/
    pages/          # React pages
    components/     # React components
    Hooks/          # Custom hooks
```

## Next Steps

1. ✅ Database setup
2. ✅ Environment variables configured
3. ✅ Run migrations
4. ✅ Start backend
5. ✅ Start frontend
6. ✅ Create account and publish blogs!

