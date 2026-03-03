import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { verify } from 'hono/jwt'
import { createPostInput, updatePostInput } from '@medium-blogging/common-app'

import { getCookie } from 'hono/cookie'

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    };
    Variables: {
        userId: string;
    };
}>();

blogRouter.use("/*", async (c, next) => {
    try {
        const token = getCookie(c, "token");
        if (!token) {
            c.status(403);
            return c.json({
                message: "You are not logged in"
            })
        }
        const user = await verify(token, c.env.JWT_SECRET, 'HS256');
        if (user) {
            // @ts-ignore
            c.set("userId", user.id);
            await next();
        } else {
            c.status(403);
            return c.json({
                message: "You are not logged in"
            })
        }
    } catch (e) {
        c.status(403);
        return c.json({
            message: "You are not logged in"
        })
    }
});

blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const { success } = createPostInput.safeParse(body);
    if (!success) {
        c.status(400);
        return c.json({ message: "Invalid inputs" });
    }
    const authorId = c.get("userId");
    const prisma = new PrismaClient({
        accelerateUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: authorId
            }
        })

        return c.json({
            id: blog.id
        })
    } catch (e) {
        console.error(e);
        c.status(500);
        return c.json({ message: "Error creating blog post" });
    }
})

blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const { success } = updatePostInput.safeParse(body);
    if (!success) {
        c.status(400);
        return c.json({ message: "Invalid inputs" });
    }
    const prisma = new PrismaClient({
        accelerateUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content
            }
        })

        return c.json({
            id: blog.id
        })
    } catch (e) {
        console.error(e);
        c.status(500);
        return c.json({ message: "Error updating blog post" });
    }
})

// Todo: add pagination
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        accelerateUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blogs = await prisma.post.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            createdAt: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    });

    return c.json({
        blogs
    })
})

blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        accelerateUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return c.json({
            blog
        });
    } catch (e) {
        c.status(404);
        return c.json({
            message: "Error while fetching blog post"
        });
    }
})
