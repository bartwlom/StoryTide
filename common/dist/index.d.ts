import zod from "zod";
declare const signupInput: zod.ZodObject<{
    email: zod.ZodString;
    password: zod.ZodString;
    name: zod.ZodOptional<zod.ZodString>;
}, "strip", zod.ZodTypeAny, {
    email: string;
    password: string;
    name?: string | undefined;
}, {
    email: string;
    password: string;
    name?: string | undefined;
}>;
declare const signinInput: zod.ZodObject<{
    email: zod.ZodString;
    password: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
declare const createPostInput: zod.ZodObject<{
    title: zod.ZodString;
    content: zod.ZodString;
    published: zod.ZodOptional<zod.ZodBoolean>;
}, "strip", zod.ZodTypeAny, {
    content: string;
    title: string;
    published?: boolean | undefined;
}, {
    content: string;
    title: string;
    published?: boolean | undefined;
}>;
declare const updatePostInput: zod.ZodObject<{
    title: zod.ZodOptional<zod.ZodString>;
    content: zod.ZodOptional<zod.ZodString>;
    published: zod.ZodOptional<zod.ZodBoolean>;
}, "strip", zod.ZodTypeAny, {
    content?: string | undefined;
    title?: string | undefined;
    published?: boolean | undefined;
}, {
    content?: string | undefined;
    title?: string | undefined;
    published?: boolean | undefined;
}>;
export type updatePostType = zod.infer<typeof updatePostInput>;
export type createPostType = zod.infer<typeof createPostInput>;
export type signinInputType = zod.infer<typeof signinInput>;
export type signupInputType = zod.infer<typeof signupInput>;
export { signupInput, signinInput, createPostInput, updatePostInput };
