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
    // Use Prisma Accelerate for Cloudflare Workers
    const accelerateUrl = c.env.DATABASE_URL.startsWith('prisma+') 
        ? c.env.DATABASE_URL 
        : c.env.DATABASE_URL;
	const prisma = new PrismaClient({
		accelerateUrl: accelerateUrl
	});
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
    // Use Prisma Accelerate for Cloudflare Workers
    const accelerateUrl = c.env.DATABASE_URL.startsWith('prisma+') 
        ? c.env.DATABASE_URL 
        : c.env.DATABASE_URL;
	const prisma = new PrismaClient({
		accelerateUrl: accelerateUrl
	});

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
    // Use Prisma Accelerate for Cloudflare Workers
    const accelerateUrl = c.env.DATABASE_URL.startsWith('prisma+') 
        ? c.env.DATABASE_URL 
        : c.env.DATABASE_URL;
	const prisma = new PrismaClient({
		accelerateUrl: accelerateUrl
	});
	
	const post = await prisma.blog.findUnique({
		where: {
			id
		}
	});

	return c.json(post);
});

blogRouter.get('/api/v1/blog/bulk', async (c) => {
    // Use Prisma Accelerate for Cloudflare Workers
    const accelerateUrl = c.env.DATABASE_URL.startsWith('prisma+') 
        ? c.env.DATABASE_URL 
        : c.env.DATABASE_URL;
	const prisma = new PrismaClient({
		accelerateUrl: accelerateUrl
	});
	
	const posts = await prisma.blog.findMany({});

	return c.json(posts);
});

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

userRouter.post('/signup', async (c) => {
    // Use Prisma Accelerate for Cloudflare Workers
    const accelerateUrl = c.env.DATABASE_URL.startsWith('prisma+') 
        ? c.env.DATABASE_URL 
        : c.env.DATABASE_URL;
    const prisma = new PrismaClient({
      accelerateUrl: accelerateUrl,
    });
  
    const body = await c.req.json();
  
    const user = await prisma.user.create({
      data: {
        email: body.email,
        passwords: body.password,
      },
    });
  
    const token = await sign({ id: user.id }, c.env.JWT_SECRET)
  
    return c.json({
      jwt: token
    })
})
  
userRouter.post('/signin', async (c) => {
    // Use Prisma Accelerate for Cloudflare Workers
    const accelerateUrl = c.env.DATABASE_URL.startsWith('prisma+') 
        ? c.env.DATABASE_URL 
        : c.env.DATABASE_URL;
    const prisma = new PrismaClient({
        accelerateUrl: accelerateUrl
    });

    const body = await c.req.json();
    const user = await prisma.user.findUnique({
        where: {
            email: body.email,
        }
    });

    if (!user || user.passwords !== body.password) {
        c.status(403);
        return c.json({ error: "user not found" });
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
})