import express from "express";
import { sendMessage,getMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const messageRouter = express.Router();

messageRouter.post("/send/:id", protectRoute, sendMessage);
messageRouter.get("/send/:id", protectRoute, getMessage);

export default messageRouter;
