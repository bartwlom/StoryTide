# Blogging Website Setup Guide

## Quick Start

###  1. Update Environment Variables

Edit `backend/.dev.vars`:
```bash
DATABASE_URL="your_actual_database_connection_string"
JWT_SECRET="your-secret-key-at-least-32-characters-long"
```

### 2. Run Database Migrations

```bash
cd backend
npx prisma migrate dev --name init
```

This will:
- Create the database tables (User, blog)
- Generate Prisma Client

### 3. Start Backend Server

```bash
cd backend
npm run dev
```

Backend will run on: `http://localhost:8787`

### 4. Start Frontend (in a new terminal)

```bash
cd frontend
npm run dev
```

Frontend will run on: `http://localhost:5174`


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
