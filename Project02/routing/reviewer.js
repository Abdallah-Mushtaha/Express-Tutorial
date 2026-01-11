import { Router } from "express";
import { add } from "../controllers/review.js";
import { setupMiddleware } from "../Middleware/index.js";
export const reviewerRouter = Router();

reviewerRouter.get("/add", setupMiddleware.auth, add)

