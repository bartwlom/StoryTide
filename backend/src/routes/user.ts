import { PrismaClient } from "../../generated/prisma/client";
import { Hono } from "hono";
import { sign } from "hono/jwt";

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
        accelerateUrl: accelerateUrl
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
