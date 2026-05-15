import "express";

declare global {
  namespace Express {
    interface UserPayload {
      sub: string;
      sid?: string;
      role?: string;
    }

    interface Request {
      user?: UserPayload;
    }
  }
}
