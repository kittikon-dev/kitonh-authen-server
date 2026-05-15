import { ENVI } from "@/configs/envi.js";
import jwt from "jsonwebtoken";

export type JWTAccessPayload = {
  sub: string;
};

export type JWTRefreshPayload = {
  sub: string;
  sid: string;
};

export function signAccessToken(payload: JWTAccessPayload): string {
  return jwt.sign(payload, ENVI.JWT_SECRET, { expiresIn: "1m" });
}

export function verifyAccessToken(token: string): JWTAccessPayload {
  return jwt.verify(token, ENVI.JWT_SECRET) as JWTAccessPayload;
}

export function signRefreshToken(payload: JWTRefreshPayload): string {
  return jwt.sign(payload, ENVI.JWT_SECRET, { expiresIn: "7d" });
}

export function verifyRefreshToken(token: string): JWTRefreshPayload {
  return jwt.verify(token, ENVI.JWT_SECRET) as JWTRefreshPayload;
}
