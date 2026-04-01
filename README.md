
### A modern, full-stack blogging platform built with React, TypeScript, and Cloudflare Workers, featuring a REST API backend and a responsive frontend.

 Homepage - "Welcome to StoryTide: Discover a world of stories and ideas."

<img width="1909" height="929" alt="4" src="https://github.com/user-attachments/assets/5ac59022-f54c-426d-8d35-90253adaabf5" />




 Login Page - "Join our community: Sign in to start sharing your stories."
   <img width="1909" height="929" alt="2" src="https://github.com/user-attachments/assets/60510402-977e-4244-88ef-6fa80d0600bf" />




Signup Page - "Become a part of StoryTide: Create your account and start your journey."
<img width="1909" height="929" alt="3" src="https://github.com/user-attachments/assets/d87d03f2-b93c-4a65-a562-893417b7b089" />




Blog Creation Page - "Share your thoughts: Create and publish your blog posts easily."
 <img width="1909" height="929" alt="1" src="https://github.com/user-attachments/assets/67319eb3-4525-4af6-be5e-f360ec73f711" />

 
### 🚀 Quick Start

### Prerequisites

- **Node.js**: v18 or higher
- **npm** or **pnpm**: Latest version
- **Database**: PostgreSQL (local or cloud)

### Installation

1. **Clone the repository**:

```bash
git clone https://github.com/abrtwcom/StoryTide.git
cd StoryTide
```

2. **Install dependencies**:

```bash
npm install
```

## 🔧 Development Commands

### Root Workspace

```bash
npm install              # Install all dependencies
npm run dev              # Start all dev servers
npm run build            # Build all packages
npm run test             # Run tests
```

### Backend

```bash
cd backend
npm run dev              # Start wrangler dev server
npm run deploy           # Deploy to Cloudflare Workers
npm run cf-typegen       # Generate Cloudflare bindings types
npm run db:seed          # Seed database with sample content
npx prisma studio        # Open Prisma database GUI
npx prisma migrate dev   # Run database migrations
```

### Frontend

```bash
cd frontend
npm run dev              # Start Vite dev server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint
```

## 📋 Initial Setup

After cloning the repository, follow these steps to set up your local development environment:

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Ensure `.env` file in backend directory contains:
- `DATABASE_URL`: Your PostgreSQL connection string
- `JWT_SECRET`: A secure random string for JWT signing

### 3. Run Database Migrations
```bash
cd backend
npx prisma migrate dev --name init
```

### 4. Seed Database (Optional)
Populate your database with sample blog posts:
```bash
cd backend
npm run db:seed
```

This creates:
- A demo user account (demo@storytide.com)
- Four sample blog posts showcasing platform features

### 5. Start Development Servers
From the root directory:
```bash
npm run dev
```

Or start individual services:
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

## 🎯 Demo Credentials

After seeding, use these credentials to explore the platform:
- **Email**: demo@storytide.com
- **Password**: 123

## 🚀 Deployment

### Quick Deployment (Recommended)

Use our automated deployment script:

```bash
./deploy.sh
```

This script will guide you through deploying both backend and frontend.

### Manual Deployment

#### Backend (Cloudflare Workers)

1. **Setup Cloudflare Account**:
   - Sign up at https://dash.cloudflare.com/
   - Install Wrangler CLI: `npm install -g wrangler`
   - Login: `npx wrangler login`

2. **Configure Environment Variables**:
   ```bash
   cd backend
   npx wrangler secret put DATABASE_URL
   npx wrangler secret put JWT_SECRET
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

4. **Copy your Worker URL** (e.g., `https://storytide.your-subdomain.workers.dev`)

#### Frontend (Vercel)

1. **Update Backend URL**:
   ```bash
   cd frontend
   echo "VITE_BACKEND_URL=https://your-worker-url.workers.dev" > .env.production.local
   ```

2. **Deploy to Vercel**:
   - Go to https://vercel.com/dashboard
   - Click "Add New Project"
   - Import your repository or drag `frontend/dist` folder
   - Add environment variable: `VITE_BACKEND_URL` with your Worker URL
   - Click "Deploy"

📋 **For detailed deployment instructions, see:**
- [`DEPLOYMENT_CHECKLIST.md`](./DEPLOYMENT_CHECKLIST.md) - Quick step-by-step guide
- [`DEPLOYMENT.md`](./DEPLOYMENT.md) - Comprehensive deployment documentation

## 📝 Recent Updates

### Platform Improvements
- ✅ Enhanced error handling in authentication flows
- ✅ Improved null checking across all components
- ✅ Public access to blog listing endpoint
- ✅ Added database seeding with sample content
- ✅ Better user feedback and error messages

### Sample Content
The platform now includes 4 high-quality blog posts:
1. "Welcome to StoryTide" - Platform introduction
2. "Understanding Modern Web Architecture" - Technical deep dive
3. "The Art of Minimalist Design" - Design philosophy
4. "Building Scalable Applications with TypeScript" - Development best practices







 
