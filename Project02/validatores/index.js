import { userSchema, loginSchema } from "./user.js";
import { reviewerSchema } from "./Reviewer.js";

export const userValidator = userSchema;
export const loginValidator = loginSchema
export const reviewerValidator = reviewerSchema