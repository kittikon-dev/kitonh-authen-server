import { AuthController } from "@/controllers/auth.controller.js";
import { authMiddleware } from "@/middlewares/auth.middleware.js";
import catchAsync from "@/utils/catchAsync.js";
import { Router } from "express";

const router = Router();

router.post(
  "/login",
  catchAsync(AuthController.handleLoginWithEmailAndPassword),
);
router.post("/logout", catchAsync(AuthController.handleLogout));
router.post("/refresh", catchAsync(AuthController.handleRefresh));

export default router;
