import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
  }
}>()

app.use('*', cors())

app.route('/api/v1/user', userRouter)
app.route('/api/v1/blog', blogRouter)

app.get('/', async (c) => {
  const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  return c.text('Hello Hono with Prisma Accelerate!')
})

export default app
