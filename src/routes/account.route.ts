import { AccountController } from "@/controllers/account.controller.js";
import catchAsync from "@/utils/catchAsync.js";
import { Router } from "express";
const router = Router();

router.post("/register", catchAsync(AccountController.handleCreateAccount));

export default router;
