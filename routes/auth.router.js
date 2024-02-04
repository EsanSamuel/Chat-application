import express from "express";
import { signIn, login} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signin", signIn);
authRouter.post("/login", login);

export default authRouter;
