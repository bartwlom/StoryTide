import zod from "zod";
const signupInput = zod.object({
    email: zod.string(),
    password: zod.string().min(6),
    name: zod.string().optional()
});
const signinInput = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6)
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
export { signupInput, signinInput, createPostInput, updatePostInput };
