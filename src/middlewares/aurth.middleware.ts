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
    const token = req.cookies["access_token"];
    if (!token) {
      throw new HttpError(ERROR_CODES.UNAUTHORIZED);
    }
    // verify token
    const payload = verifyAccessToken(token);
    // find session
    const session = await SessionRepository.findById(payload.sessionId);
    if (!session || (session && !session.isActive)) {
      throw new HttpError(ERROR_CODES.UNAUTHORIZED);
    }

    // check revoked
    if (session.revokedAt) {
      throw new HttpError(ERROR_CODES.UNAUTHORIZED);
    }

    // check if session expired
    if (session.expiresAt < new Date()) {
      throw new HttpError(ERROR_CODES.UNAUTHORIZED);
    }
    req.user = {
      accountId: payload.accountId,
      sessionId: payload.sessionId,
    };

    next();
  } catch (error) {
    return res.status(500).json({
      error: {
        code: ERROR_CODES.INTERNAL.code,
        message: ERROR_CODES.INTERNAL.message,
      },
    });
  }
}
