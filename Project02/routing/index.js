import booksRouter from "./books.js";
import authRouter from "./auth.js";

const routes = (app) => {
    app.get('/', (req, res) => res.status(200).json({ status: 200, message: "hello world" }));
    app.use("/books", booksRouter);
    app.use("/auth", authRouter);
};

export default routes;