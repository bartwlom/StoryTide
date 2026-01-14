import zod from "zod";
declare const signupInput: zod.ZodObject<{
    email: zod.ZodString;
    password: zod.ZodString;
    name: zod.ZodOptional<zod.ZodString>;
}, zod.core.$strip>;
declare const signinInput: zod.ZodObject<{
    email: zod.ZodString;
    password: zod.ZodString;
}, zod.core.$strip>;
declare const createPostInput: zod.ZodObject<{
    title: zod.ZodString;
    content: zod.ZodString;
    published: zod.ZodOptional<zod.ZodBoolean>;
}, zod.core.$strip>;
declare const updatePostInput: zod.ZodObject<{
    title: zod.ZodOptional<zod.ZodString>;
    content: zod.ZodOptional<zod.ZodString>;
    published: zod.ZodOptional<zod.ZodBoolean>;
}, zod.core.$strip>;
export type updatePostType = zod.infer<typeof updatePostInput>;
export type createPostType = zod.infer<typeof createPostInput>;
export type signinInputType = zod.infer<typeof signinInput>;
export type signupInputType = zod.infer<typeof signupInput>;
export { signupInput, signinInput, createPostInput, updatePostInput };
