import express from "express";
import {
  getUsers,
  getUserId,
  getUserById,
} from "../controllers/user.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const userRouter = express.Router();

userRouter.get("/userid", protectRoute, getUserId);
userRouter.get("/users", protectRoute, getUsers);
userRouter.get("/user/:id", getUserById);

export default userRouter;
