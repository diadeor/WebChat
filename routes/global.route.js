import { Router } from "express";
import { getGlobalMessages } from "../controllers/global.controller.js";

const globalRouter = Router();

globalRouter.get("/", getGlobalMessages);

export default globalRouter;
