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





