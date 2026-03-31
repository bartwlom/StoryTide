import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from "hono";
import { sign } from "hono/jwt";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>();


import { signupInput, signinInput } from "@medium-blogging/common-app";

async function hashPassword(password: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}


userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    // @ts-ignore
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({
      message: "Inputs not correct"
    })
  }

  try {
    const hashedPassword = await hashPassword(body.password);
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
        name: body.name
      }
    })

    const jwt = await sign({
      id: user.id
    }, c.env.JWT_SECRET);

    return c.json({ jwt })
  } catch (e) {
    console.log(e);
    c.status(403);
    return c.json({ error: 'User already exists or invalid input' })
  }
})

userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    // @ts-ignore
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({
      message: "Inputs not correct"
    })
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email
      }
    })

    const hashedPassword = await hashPassword(body.password);
    if (!user || user.password !== hashedPassword) {
      c.status(401)
      return c.json({ error: "Invalid credentials" })
    }

    const jwt = await sign(
      { id: user.id },
      c.env.JWT_SECRET
    )

    return c.json({ jwt })
  } catch (e) {
    console.log(e);
    c.status(500)
    return c.json({ error: "Internal server error" })
  }
})
