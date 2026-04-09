import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { verify } from 'hono/jwt'
import { createPostInput, updatePostInput } from "@medium-blogging/common-app";

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
    // Try to get token from cookie first, then from authorization header
    const cookieHeader = c.req.header("cookie") || "";
    const authHeader = c.req.header("authorization") || "";
    
    // Allow public access to blog reading endpoints (GET /bulk and GET /:id)
    const isBulkRead = c.req.path.includes("/bulk") && c.req.method === "GET";
    const isSingleBlogRead = /^\/[\w-]+$/.test(c.req.path.replace('/api/v1/blog', '')) && c.req.method === "GET";
    
    if (isBulkRead || isSingleBlogRead) {
        await next();
        return;
    }
    
    try {
        let token = "";
        
        // Extract token from cookie
        const cookieMatch = cookieHeader.match(/token=([^;]+)/);
        if (cookieMatch) {
            token = cookieMatch[1];
        } else {
            // Fallback to authorization header
            token = authHeader.startsWith("Bearer ") ? authHeader.split(' ')[1] : authHeader;
        }
        
        const user = await verify(token, c.env.JWT_SECRET, 'HS256') as { id: string };
        if (user) {
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
        c.status(403);
        return c.json({
            message: "Inputs not correct"
        })
    }
    const authorId = c.get("userId");
    const prisma = new PrismaClient({
        accelerateUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

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
})

blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const { success } = updatePostInput.safeParse(body);
    if (!success) {
        c.status(403);
        return c.json({
            message: "Inputs not correct"
        })
    }
    const prisma = new PrismaClient({
        accelerateUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

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
        c.status(500); 
        return c.json({
            message: "Error while fetching blog post"
        });
    }
})
