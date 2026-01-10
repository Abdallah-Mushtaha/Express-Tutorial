import { Router } from "express";
import { booksController } from "../controllers/index.js";

const booksRouter = Router();

booksRouter.get("/", booksController.getbooks)
    .get("/pages", booksController.getBooksCount)
    .get("/:id", booksController.getBooksById);

export default booksRouter;