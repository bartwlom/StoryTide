import { Hono } from 'hono'
import { verify } from 'hono/jwt'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
	Variables: {
		userId: string;
	};
}>()

// JWT Authentication Middleware
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const authMiddleware = async (c: any, next: () => Promise<void>) => {
	const header = c.req.header('Authorization');
	if (!header) {
		c.status(401);
		return c.json({ error: 'Unauthorized' });
	}
	
	const token = header.split(' ')[1] || header; // Support both "Bearer token" and just "token"
	
	try {
		const payload = await verify(token, c.env.JWT_SECRET, 'HS256') as { id: number | string };
		c.set('userId', String(payload.id));
		await next();
	} catch (e) {
		c.status(401);
		return c.json({ error: 'Unauthorized' });
	}
}

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/api/v1/user', userRouter)

// Apply auth middleware only to POST and PUT routes
blogRouter.post('*', authMiddleware)
blogRouter.put('*', authMiddleware)
app.route('/', blogRouter)

export default app
