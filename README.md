# 🌊 StoryTide

A modern, full-stack blogging platform inspired by Medium, featuring a professional terminal-inspired aesthetic. Built with a robust workspace architecture for high-performance development.

## ✨ Features

- 🔐 **Secure Authentication**: JWT-based auth with HttpOnly cookies for maximum security.
- 🐚 **Terminal Aesthetic**: Premium dark-mode UI with CRT scanline effects and a sleek monospace design system.
- ⚡ **Edge Infrastructure**: Powered by Cloudflare Workers for global low-latency performance.
- 🗄️ **Type-Safe Database**: Prisma ORM with Neon Postgres for reliable, high-speed data management.
- 🛠️ **Monorepo Architecture**: Shared Zod schemas between frontend and backend for end-to-end type safety.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: Vanilla CSS + [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router 7](https://reactrouter.com/)

### Backend
- **Engine**: [Hono](https://hono.dev/) (Cloudflare Workers)
- **Database**: [PostgreSQL (Neon)](https://neon.tech/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Deployment**: [Wrangler](https://developers.cloudflare.com/workers/wrangler/)

### Shared Library
- **Validation**: [Zod](https://zod.dev/) (Shared input validation logic across the workspace)

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18 or higher
- **Postgres**: Access to a Neon.tech database cloud instance

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/abrtwcom/StoryTide.git
   cd StoryTide
   ```

2. **Install workspace dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   Create a `.dev.vars` file in the `backend/` directory:
   ```env
   DATABASE_URL="your_prisma_connection_string"
   JWT_SECRET="your_secret_key"
   ```

### 🔨 Development Workflow

#### Root commands
| Command | Action |
| :-- | :-- |
| `npm run build` | Build the backend and common packages |
| `npm run deploy` | Deploy to Cloudflare production |

#### Component-specific development
| Location | Command | Action |
| :-- | :-- | :-- |
| `/frontend` | `npm run dev` | Start Vite dev server |
| `/backend` | `npm run dev` | Start Wrangler dev server |
| `/common` | `npm run build` | Compile shared TypeScript types |

---

## 📂 Project Structure

```bash
StoryTide/
├── common/     # Shared Zod schemas & TypeScript definitions
├── frontend/   # React/Vite application (Monospace UI)
└── backend/    # Hono API hosted on Cloudflare Workers
```

## 📄 License
Developed for the modern web with a focus on speed and visual excellence.
