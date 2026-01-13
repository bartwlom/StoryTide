"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostInput = exports.createPostInput = exports.signinInput = exports.signupInput = void 0;
const zod_1 = __importDefault(require("zod"));
const signupInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
    name: zod_1.default.string().optional()
});
exports.signupInput = signupInput;
const signinInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6)
});
exports.signinInput = signinInput;
const createPostInput = zod_1.default.object({
    title: zod_1.default.string().min(1).max(255),
    content: zod_1.default.string().min(1),
    published: zod_1.default.boolean().optional()
});
exports.createPostInput = createPostInput;
const updatePostInput = zod_1.default.object({
    title: zod_1.default.string().min(1).max(255).optional(),
    content: zod_1.default.string().min(1).optional(),
    published: zod_1.default.boolean().optional()
});
exports.updatePostInput = updatePostInput;
//# sourceMappingURL=index.js.map