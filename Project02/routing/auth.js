import Route from "express";
import { authController } from "../controllers/index.js";

const authRouter = Route();

authRouter.post("/signup", authController.Sign_in)
    .post("/login", authController.Log_in);

export default authRouter;