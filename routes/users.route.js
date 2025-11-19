import { Router } from "express";
import { getUsers } from "../controllers/users.controller.js";

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/me");

export default userRouter;
