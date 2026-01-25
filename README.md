
A modern, full-stack blogging platform built with React, TypeScript, and Cloudflare Workers, featuring a REST API backend and a responsive frontend.

 Homepage - "Welcome to StoryTide: Discover a world of stories and ideas."

<img width="1909" height="929" alt="4" src="https://github.com/user-attachments/assets/5ac59022-f54c-426d-8d35-90253adaabf5" />




 Login Page - "Join our community: Sign in to start sharing your stories."
   <img width="1909" height="929" alt="2" src="https://github.com/user-attachments/assets/60510402-977e-4244-88ef-6fa80d0600bf" />




Signup Page - "Become a part of StoryTide: Create your account and start your journey."
<img width="1909" height="929" alt="3" src="https://github.com/user-attachments/assets/d87d03f2-b93c-4a65-a562-893417b7b089" />




Blog Creation Page - "Share your thoughts: Create and publish your blog posts easily."
 <img width="1909" height="929" alt="1" src="https://github.com/user-attachments/assets/67319eb3-4525-4af6-be5e-f360ec73f711" />

 
## 🚀 Quick Start

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
```







 
