import { Router } from "express";
import { googleLogin } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/google", googleLogin);

export default authRouter;
