import { AuthController } from "@/controllers/auth.controller.js";
import { authMiddleware } from "@/middlewares/aurth.middleware.js";
import catchAsync from "@/utils/catchAsync.js";
import { Router } from "express";

const router = Router();

router.post(
  "/login",
  catchAsync(AuthController.handleLoginWithEmailAndPassword),
);
router.post("/logout", authMiddleware, catchAsync(AuthController.handleLogout));

export default router;
