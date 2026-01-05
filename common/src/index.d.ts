import zod from "zod";
export type updatePostType = zod.infer<typeof updatePostInput>;
export type createPostType = zod.infer<typeof createPostInput>;
export type signinInputType = zod.infer<typeof signinInput>;
export type signupInputType = zod.infer<typeof signupInput>;
export declare const signupInput: zod.ZodObject<{
    email: zod.ZodString;
    password: zod.ZodString;
    name: zod.ZodOptional<zod.ZodString>;
}, zod.core.$strip>;
export declare const signinInput: zod.ZodObject<{
    email: zod.ZodString;
    password: zod.ZodString;
}, zod.core.$strip>;
export declare const createPostInput: zod.ZodObject<{
    title: zod.ZodString;
    content: zod.ZodString;
    published: zod.ZodOptional<zod.ZodBoolean>;
}, zod.core.$strip>;
export declare const updatePostInput: zod.ZodObject<{
    title: zod.ZodOptional<zod.ZodString>;
    content: zod.ZodOptional<zod.ZodString>;
    published: zod.ZodOptional<zod.ZodBoolean>;
}, zod.core.$strip>;
//# sourceMappingURL=index.d.ts.map