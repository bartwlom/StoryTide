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
    // Set DATABASE_URL for Prisma Client
    if (typeof process !== 'undefined' && process.env) {
        process.env.DATABASE_URL = c.env.DATABASE_URL;
    }
    // @ts-ignore - Prisma Client will use DATABASE_URL from process.env
    const prisma = new PrismaClient();
  
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
    // Set DATABASE_URL for Prisma Client
    if (typeof process !== 'undefined' && process.env) {
        process.env.DATABASE_URL = c.env.DATABASE_URL;
    }
    // @ts-ignore - Prisma Client will use DATABASE_URL from process.env
    const prisma = new PrismaClient();

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
