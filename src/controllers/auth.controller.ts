import { ENVI } from "@/configs/envi.js";
import { loginWithEmailAndPasswordSchema } from "@/dtos/auth/loginWithEmailAndPassword.dto.js";
import { ERROR_CODES } from "@/errors/errors-codes.js";
import { HttpError } from "@/errors/http-error.js";
import { AuthService } from "@/services/auth.service.js";
import type { Request, Response } from "express";

const handleLoginWithEmailAndPassword = async (req: Request, res: Response) => {
  const result = loginWithEmailAndPasswordSchema.safeParse(req.body);
  if (!result.success) {
    throw new HttpError(ERROR_CODES.VALIDATION_FAILED);
  }

  const { accessToken, refreshToken } =
    await AuthService.loginWithEmailAndPassword(result.data);

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: ENVI.MODE === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000, // expires in 7 days
  });

  return res
    .status(201)
    .json({ message: "Login successful", data: { accessToken } });
};

const handleLogout = async (req: Request, res: Response) => {
  const refreshToken = req.cookies["refresh_token"];
  console.log("refreshToken", refreshToken);
  res.clearCookie("refresh_token", {
    httpOnly: true,
    secure: ENVI.MODE === "production",
    sameSite: "strict",
    path: "/",
  });

  if (!refreshToken) {
    return res.status(200).json({ message: "Logout successful", data: null });
  }

  await AuthService.logout(refreshToken);
  return res.status(200).json({ message: "Logout successful", data: null });
};

const handleRefresh = async (req: Request, res: Response) => {
  const refreshToken = req.cookies["refresh_token"];
  console.log("refreshToken", refreshToken);
  if (!refreshToken) {
    throw new HttpError(ERROR_CODES.UNAUTHORIZED);
  }

  try {
    const tokens = await AuthService.refresh(refreshToken);
    console.log("tokens", tokens);
    res.cookie("refresh_token", tokens.refreshToken, {
      httpOnly: true,
      secure: ENVI.MODE === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // expires in 7 days
    });

    return res.status(200).json({
      message: "Tokens refreshed successfully",
      data: { accessToken: tokens.accessToken },
    });
  } catch (error) {
    throw new HttpError(ERROR_CODES.UNAUTHORIZED);
  }
};

export const AuthController = {
  handleLoginWithEmailAndPassword,
  handleLogout,
  handleRefresh,
};
