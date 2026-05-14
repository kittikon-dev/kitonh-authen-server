import type { Request, Response, NextFunction } from "express";
import { HttpError } from "../errors/http-error.js";
import { ERROR_CODES } from "../errors/errors-codes.js";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message,
      },
    });
  }
  return res.status(500).json({
    error: {
      code: ERROR_CODES.INTERNAL.code,
      message: ERROR_CODES.INTERNAL.message,
    },
  });
}
