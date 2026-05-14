import { ENVI } from "@/configs/envi.js";
import jwt from "jsonwebtoken";

export type AccessTokenPayload = {
  accountId: string;
  sessionId: string;
};

export function signAccessToken(payload: object): string {
  return jwt.sign(payload, ENVI.JWT_SECRET, { expiresIn: "15m" });
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  return jwt.verify(token, ENVI.JWT_SECRET) as AccessTokenPayload;
}
