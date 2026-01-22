# Full Stack Blogging Platform


A modern, full-stack blogging platform built with React, TypeScript, and Cloudflare Workers, featuring a REST API backend and a responsive frontend.
Generally build to discover,read and write ideas that avail...

## 🚀 Quick Start

### Prerequisites

- **Node.js**: v18 or higher
- **npm** or **pnpm**: Latest version
- **Database**: PostgreSQL (local or cloud)

### Installation

1. **Clone and install dependencies**:
```bash
# Install all project dependencies
npm install
```

---

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
npx prisma studio        # Open Prisma database GUI
npx prisma migrate dev   # Run database migrations
node patch-prisma.js     # Apply Prisma compatibility patch
node patch-uuid.js       # Apply UUID compatibility patch
```

### Frontend
```bash
cd frontend
npm run dev              # Start Vite dev server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint


