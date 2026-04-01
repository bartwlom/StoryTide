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

// Enhanced CORS configuration for production
app.use('*', cors({
  origin: (origin) => {
    // Allow all origins in production (can be restricted if needed)
    // Add your Vercel deployment URL here when you have it
    return origin;
  },
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length'],
  maxAge: 86400,
  credentials: true
}))

app.route('/api/v1/user', userRouter)
app.route('/api/v1/blog', blogRouter)

app.get('/', (c) => {
  return c.text('StoryTide API is running!')
})

export default app