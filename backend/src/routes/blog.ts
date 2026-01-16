import { Hono } from 'hono';
import { PrismaClient } from "../../generated/prisma/client";
import { sign } from 'hono/jwt';

export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
	Variables: {
		userId: string;
	};
}>();

blogRouter.post('/api/v1/blog', async (c) => {
	const userId = c.get('userId');
	// Set DATABASE_URL for Prisma Client
	if (typeof process !== 'undefined' && process.env) {
		process.env.DATABASE_URL = c.env.DATABASE_URL;
	}
	// @ts-ignore - Prisma Client will use DATABASE_URL from process.env
	const prisma = new PrismaClient();

	const body = await c.req.json();
	const post = await prisma.blog.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: parseInt(userId)
		}
	});
	return c.json({
		id: post.id
	});
});

blogRouter.put('/api/v1/blog', async (c) => {
	const userId = c.get('userId');
	// Set DATABASE_URL for Prisma Client
	if (typeof process !== 'undefined' && process.env) {
		process.env.DATABASE_URL = c.env.DATABASE_URL;
	}
	// @ts-ignore - Prisma Client will use DATABASE_URL from process.env
	const prisma = new PrismaClient();

	const body = await c.req.json();
	await prisma.blog.update({
		where: {
			id: body.id,
			authorId: parseInt(userId)
		},
		data: {
			title: body.title,
			content: body.content
		}
	});

	return c.text('updated post');
});

blogRouter.get('/api/v1/blog/:id', async (c) => {
	const id = parseInt(c.req.param('id'));
	// Set DATABASE_URL for Prisma Client
	if (typeof process !== 'undefined' && process.env) {
		process.env.DATABASE_URL = c.env.DATABASE_URL;
	}
	// @ts-ignore - Prisma Client will use DATABASE_URL from process.env
	const prisma = new PrismaClient();
	
	const post = await prisma.blog.findUnique({
		where: {
			id
		},
		include: {
			author: {
				select: {
					name: true
				}
			}
		}
	});

	if (!post) {
		c.status(404);
		return c.json({ error: "Blog not found" });
	}

	return c.json({ blog: post });
});

blogRouter.get('/api/v1/blog/bulk', async (c) => {
	// Set DATABASE_URL for Prisma Client
	if (typeof process !== 'undefined' && process.env) {
		process.env.DATABASE_URL = c.env.DATABASE_URL;
	}
	// @ts-ignore - Prisma Client will use DATABASE_URL from process.env
	const prisma = new PrismaClient();
	
	const posts = await prisma.blog.findMany({
		include: {
			author: {
				select: {
					name: true
				}
			}
		}
	});

	return c.json({ blogs: posts });
});