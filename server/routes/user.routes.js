import express from "express";
import UserController from "../Controller/user.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// 🔹 Register new user
router.post("/user/register", UserController.register);

// 🔹 Login user
router.post("/user/login", UserController.login);

// 🔹 Logout user
router.post("/user/logout", auth, UserController.logout);

// 🔹 Verify user token
//router.get("/user/verify", auth, UserController.verifyToken);

export default router;