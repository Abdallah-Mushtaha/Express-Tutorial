import { Router } from "express";
import { booksController } from "../controllers/index.js";
import { setupMiddleware } from "../Middleware/index.js";
const booksRouter = Router();

booksRouter.get("/", booksController.getbooks)
    .get("/pages", setupMiddleware.auth, booksController.getBooksCount)
    .get("/:id", booksController.getBooksById);

export default booksRouter;