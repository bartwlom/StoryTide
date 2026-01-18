# Full Stack Blogging Platform

A modern, full-stack blogging platform built with React, TypeScript, and Cloudflare Workers, featuring a REST API backend and a responsive frontend.

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

# Install workspace dependencies
cd frontend && npm install
cd backend && npm install
cd common && npm install
```

2. **Set up the database**:
```bash
# Option A: Local PostgreSQL
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo -u postgres psql -c "CREATE DATABASE blogging_db;"

# Option B: Cloud database (recommended)
# Use Neon, Supabase, or Railway for free PostgreSQL
```

3. **Configure environment variables**:
```bash
# Backend configuration
cp backend/.env.example backend/.env
cp backend/.dev.vars.example backend/.dev.vars

# Update with your database URL
echo 'DATABASE_URL="postgresql://user:password@localhost:5432/blogging_db"' > backend/.env
echo 'DATABASE_URL="your_cloud_db_url"' > backend/.dev.vars
echo 'JWT_SECRET="your-super-secret-jwt-key-at-least-32-characters"' >> backend/.dev.vars
```

4. **Run database migrations**:
```bash
cd backend
npx prisma migrate dev --name init
```

5. **Start development servers**:
```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev
```

6. **Access the application**:
- Frontend: http://localhost:5174
- Backend API: http://localhost:8787

---

## 📁 Project Structure

```
blogging-website/
├── backend/                 # Cloudflare Workers backend
│   ├── src/
│   │   ├── index.ts        # Main application entry
│   │   └── routes/         # API route handlers
│   │       ├── user.ts     # User authentication routes
│   │       └── blog.ts     # Blog CRUD routes
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   ├── generated/          # Generated Prisma client
│   ├── patch-*.js         # UUID/Prisma compatibility patches
│   ├── wrangler.jsonc     # Cloudflare Workers config
│   └── package.json
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── pages/         # Route pages
│   │   │   ├── Blog.tsx   # Single blog post view
│   │   │   ├── Blogs.tsx  # All blogs listing
│   │   │   ├── Publish.tsx# Create new blog
│   │   │   ├── Signin.tsx # User sign in
│   │   │   └── Signup.tsx # User registration
│   │   ├── components/    # Reusable UI components
│   │   │   ├── Appbar.tsx
│   │   │   ├── Auth.tsx
│   │   │   ├── FullBlog.tsx
│   │   │   └── ...
│   │   └── config.ts      # API configuration
│   └── package.json
├── common/                 # Shared TypeScript types
│   ├── src/
│   │   └── index.ts       # Shared interfaces
│   └── package.json
└── package.json           # Root workspace config
```

---

## 🛠 Technology Stack

### Backend
- **Runtime**: Cloudflare Workers
- **Framework**: [Hono](https://hono.dev/) (lightweight web framework)
- **Database**: PostgreSQL with [Prisma ORM](https://www.prisma.io/)
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: [Wrangler](https://developers.cloudflare.com/workers/wrangler/)
- **Language**: TypeScript

### Frontend
- **Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **HTTP Client**: Axios
- **State Management**: React Hooks + Context

### Database Schema

```prisma
model User {
  id        Int     @id @default(autoincrement())
  email     String  @unique
  name      String?
  password  String
  posts     Blog[]
}

model Blog {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}
```

---

## ✨ Features

### User Authentication
- ✅ User registration with name, email, and password
- ✅ Secure login with JWT token generation
- ✅ Token-based authentication for protected routes
- ✅ Persistent login state with localStorage

### Blog Management
- ✅ Create new blog posts with title and content
- ✅ View all published blogs on the homepage
- ✅ View individual blog posts
- ✅ Responsive blog card layout
- ✅ Skeleton loading states

### API Endpoints

```
POST   /api/v1/user/signup        # Register new user
POST   /api/v1/user/signin        # Authenticate user
GET    /api/v1/blog/bulk          # Get all blogs
GET    /api/v1/blog/:id           # Get single blog by ID
POST   /api/v1/blog               # Create new blog (protected)
```

### Frontend Features
- ✅ Modern, responsive UI with Tailwind CSS
- ✅ Type-safe API calls with TypeScript
- ✅ React Router for client-side navigation
- ✅ Protected routes (publish page requires auth)
- ✅ Loading and error states
- ✅ Quote component for visual appeal

---

## 📚 API Documentation

### Authentication Endpoints

#### POST /api/v1/user/signup

Register a new user account.

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response**:
```json
{
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Status Codes**:
- `201 Created`: User registered successfully
- `400 Bad Request`: Invalid input or email already exists

#### POST /api/v1/user/signin

Authenticate an existing user.

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response**:
```json
{
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Status Codes**:
- `200 OK`: Authentication successful
- `401 Unauthorized`: Invalid credentials

### Blog Endpoints

#### GET /api/v1/blog/bulk

Retrieve all published blog posts.

**Response**:
```json
{
  "blogs": [
    {
      "id": 1,
      "title": "My First Blog",
      "content": "Lorem ipsum...",
      "published": true,
      "author": {
        "id": 1,
        "name": "John Doe"
      }
    }
  ]
}
```

#### GET /api/v1/blog/:id

Retrieve a single blog post by ID.

**Response**:
```json
{
  "id": 1,
  "title": "My First Blog",
  "content": "Lorem ipsum dolor sit amet...",
  "published": true,
  "author": {
    "id": 1,
    "name": "John Doe"
  }
}
```

#### POST /api/v1/blog

Create a new blog post (requires authentication).

**Headers**:
```
Authorization: Bearer <jwt_token>
```

**Request Body**:
```json
{
  "title": "My New Blog Post",
  "content": "This is the content of my blog post..."
}
```

**Response**:
```json
{
  "id": 2,
  "title": "My New Blog Post",
  "content": "This is the content of my blog post...",
  "published": true
}
```

---

## 🚀 Deployment

### Backend (Cloudflare Workers)

1. **Configure wrangler**:
Update `backend/wrangler.jsonc` with your Cloudflare account details.

2. **Deploy**:
```bash
cd backend
npm run deploy
```

**Note**: There are known compatibility issues with Prisma UUID and Cloudflare Workers. See [DEPLOYMENT_ISSUE.md](backend/DEPLOYMENT_ISSUE.md) for details.

### Frontend (Vercel/Netlify)

```bash
cd frontend
npm run build
# Deploy the dist/ folder to your preferred hosting
```

---

## 🐛 Known Issues & Troubleshooting

### Prisma + Cloudflare Workers Compatibility

The Prisma Client has compatibility issues with Cloudflare Workers due to Node.js-specific APIs. This project includes custom patches to work around these issues.

**Current Status**:
- Local development: ✅ Working with patches
- Production deployment: ⚠️ May have issues

**Workaround**:
```bash
# Apply patches after installation
cd backend
node patch-prisma.js
node patch-uuid.js
```

See [backend/DEPLOYMENT_ISSUE.md](backend/DEPLOYMENT_ISSUE.md) for detailed troubleshooting.

### Common Issues

#### Database Connection Failed
```
Error: P1001: Can't reach database server
```
**Solution**: Verify your `DATABASE_URL` in `.dev.vars` and ensure the database is accessible.

#### JWT Token Invalid
```
401 Unauthorized
```
**Solution**: Check that the JWT secret matches between frontend and backend configurations.

#### Module Not Found
```
✘ [ERROR] Could not resolve "hono"
```
**Solution**: Ensure all dependencies are installed:
```bash
npm install
cd backend && npm install
```

#### Port Already in Use
```
EADDRINUSE: address already in use :::8787
```
**Solution**: Kill the existing process or change the port in `wrangler.jsonc`.

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
```

### Common Package
```bash
cd common
npm run build            # Build shared types
```

---

## 📝 Configuration Files

### Environment Variables

**Backend (.dev.vars)**:
```env
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
```

**Frontend (src/config.ts)**:
```typescript
export const BACKEND_URL = "http://localhost:8787";
```

### Wrangler Configuration (backend/wrangler.jsonc)

Key settings:
- `compatibility_date`: "2026-01-16"
- `compatibility_flags`: ["nodejs_compat"]
- Environment variables defined in `vars` section

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- [Hono](https://hono.dev/) - Lightweight web framework
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Cloudflare Workers](https://workers.cloudflare.com/) - Serverless platform
- [Vite](https://vitejs.dev/) - Next-generation frontend tooling

