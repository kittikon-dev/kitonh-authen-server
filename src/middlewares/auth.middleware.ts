import { ERROR_CODES } from "@/errors/errors-codes.js";
import { HttpError } from "@/errors/http-error.js";
import { SessionRepository } from "@/repositories/session.repository.js";
import { verifyAccessToken } from "@/utils/jwt.js";
import type { Request, Response, NextFunction } from "express";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const authorization = req.headers["authorization"];

    if (!authorization?.startsWith("Bearer ")) {
      throw new HttpError(ERROR_CODES.UNAUTHORIZED);
    }
    const token = authorization.split(" ")[1] || "";

    // verify token
    const payload = verifyAccessToken(token);

    req.user = {
      sub: payload.sub,
    };

    next();
  } catch (error) {
    throw new HttpError(ERROR_CODES.UNAUTHORIZED);
  }
}
