import zod from "zod";

const signupInput = zod.object({
    email:zod.string().email(),
    password:zod.string().min(6),
    name: zod.string().optional()
});

const signinInput = zod.object({
    email:zod.string().email(),
    password:zod.string().min(6)
});

const createPostInput = zod.object({
    title: zod.string().min(1).max(255),
    content: zod.string().min(1),
    published: zod.boolean().optional()
});     

const updatePostInput = zod.object({
    title: zod.string().min(1).max(255).optional(),
    content: zod.string().min(1).optional(),
    published: zod.boolean().optional()
});

export type updatePostType = zod.infer<typeof updatePostInput>;
export type createPostType = zod.infer<typeof createPostInput>;
export type signinInputType = zod.infer<typeof  signinInput>;
export type signupInputType = zod.infer<typeof signupInput>;

export { signupInput, signinInput, createPostInput, updatePostInput };