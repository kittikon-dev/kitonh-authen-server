import { ENVI } from "@/configs/envi.js";
import { loginWithEmailAndPasswordSchema } from "@/dtos/auth/loginWithEmailAndPassword.dto.js";
import { ERROR_CODES } from "@/errors/errors-codes.js";
import { HttpError } from "@/errors/http-error.js";
import { SessionRepository } from "@/repositories/session.repository.js";
import { AuthService } from "@/services/auth.service.js";
import { verifyAccessToken } from "@/utils/jwt.js";
import type { Request, Response } from "express";

const handleLoginWithEmailAndPassword = async (req: Request, res: Response) => {
  const result = loginWithEmailAndPasswordSchema.safeParse(req.body);
  if (!result.success) {
    throw new HttpError(ERROR_CODES.VALIDATION_FAILED);
  }

  const { accessToken, refreshToken } =
    await AuthService.loginWithEmailAndPassword(result.data);

  res.cookie("access_token", accessToken, {
    httpOnly: true,
    secure: ENVI.MODE === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 15,
  });

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: ENVI.MODE === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // expires in 7 days
  });

  return res.status(201).json({ message: "Login successful", data: null });
};

const handleLogout = async (req: Request, res: Response) => {
  const token = req.cookies["access_token"];
  if (token) {
    const payload = verifyAccessToken(token);

    SessionRepository.revoke(payload.sessionId);
  }
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
  return res.status(200).json({ message: "Logout successful", data: null });
};

export const AuthController = {
  handleLoginWithEmailAndPassword,
  handleLogout,
};
