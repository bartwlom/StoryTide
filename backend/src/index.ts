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
  origin: ['https://story-tide-frontend-fwnkj1ins-amitbartwal008-6084s-projects.vercel.app', 'https://story-tide-frontend.vercel.app', '*'],
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

export default app