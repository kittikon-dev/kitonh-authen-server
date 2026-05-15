import { AccountController } from "@/controllers/account.controller.js";
import { authMiddleware } from "@/middlewares/auth.middleware.js";
import catchAsync from "@/utils/catchAsync.js";
import { Router } from "express";

const router = Router();

router.post("/register", catchAsync(AccountController.handleCreateAccount));
router.get("/me", authMiddleware, catchAsync(AccountController.handleGetMe));

export default router;
