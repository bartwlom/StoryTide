import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>()

// Enhanced CORS configuration for production with cookie support
app.use('*', cors({
  origin: (origin, c) => {
    // Allow requests from known origins or localhost for development
    const allowedOrigins = [
      'https://story-tide-frontend.vercel.app',
      'https://story-tide-frontend-fwnkj1ins-amitbartwal008-6084s-projects.vercel.app',
      'http://localhost:5173',
      'http://localhost:3000'
    ];
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return '*';
    
    if (allowedOrigins.includes(origin)) {
      return origin;
    }
    
    return null;
  },
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length', 'X-Requested-With'],
  maxAge: 86400,
  credentials: true
}))

app.route('/api/v1/user', userRouter)
app.route('/api/v1/blog', blogRouter)

app.get('/', (c) => {
  return c.text('StoryTide API is running!')
})

export default app;