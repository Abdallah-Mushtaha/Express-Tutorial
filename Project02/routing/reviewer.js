import { Router } from "express";
import { add, remove } from "../controllers/review.js";
import { setupMiddleware } from "../Middleware/index.js";
export const reviewerRouter = Router();

reviewerRouter.get("/add", setupMiddleware.auth, add)
    .delete("/:id", setupMiddleware.auth, remove);

