import type { LoginWithEmailAndPasswordDTO } from "@/dtos/auth/loginWithEmailAndPassword.dto.js";
import { ERROR_CODES } from "@/errors/errors-codes.js";
import { HttpError } from "@/errors/http-error.js";
import { AccountPasswordRepository } from "@/repositories/account-password.repository.js";
import { AccountRepository } from "@/repositories/account.repository.js";
import { SessionRepository } from "@/repositories/session.repository.js";
import bcrypt from "bcrypt";
import { Types } from "mongoose";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "@/utils/jwt.js";

const loginWithEmailAndPassword = async (dto: LoginWithEmailAndPasswordDTO) => {
  try {
    // find account
    const account = await AccountRepository.findByEmail(dto.email);
    if (!account) {
      throw new HttpError(ERROR_CODES.ACCOUNT_NOT_FOUND);
    }
    // get password hash
    const accountPassword = await AccountPasswordRepository.findByAccountId(
      account._id.toString(),
    );
    if (!accountPassword) {
      throw new HttpError(ERROR_CODES.ACCOUNT_NOT_FOUND);
    }
    // compare password
    const isPasswordValid = await bcrypt.compare(
      dto.password,
      accountPassword.passwordHash,
    );
    if (!isPasswordValid) {
      throw new HttpError(ERROR_CODES.ACCOUNT_EMAIL_PASS_INVALID);
    }

    // generate token
    const session = await SessionRepository.create({
      accountId: new Types.ObjectId(account._id),
      isActive: true,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // expires in 7 days
    });

    const accessToken = signAccessToken({
      sub: account._id.toString(),
    });

    const refreshToken = signRefreshToken({
      sub: account._id.toString(),
      sid: session._id.toString(),
    });

    return { accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
};

const logout = async (refreshToken: string) => {
  const payload = verifyRefreshToken(refreshToken);
  console.log("payload", payload);
  return await SessionRepository.revoke(payload.sid!);
};

const refresh = async (refreshToken: string) => {
  const payload = verifyRefreshToken(refreshToken);
  console.log("payload", payload);

  const session = await SessionRepository.findById(payload.sid!);
  console.log("session", session);
  if (!session) {
    throw new HttpError(ERROR_CODES.SESSION_NOT_FOUND);
  }

  if (session.revokedAt) {
    throw new HttpError(ERROR_CODES.SESSION_REVOKED);
  }

  if (session.expiresAt < new Date()) {
    throw new HttpError(ERROR_CODES.SESSION_EXPIRED);
  }

  session.revokedAt = new Date();
  await session.save();

  const newSession = await SessionRepository.create({
    accountId: new Types.ObjectId(payload.sub),
    isActive: true,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // expires in 7 days
  });
  console.log("newSession", newSession);

  const newAccessToken = signAccessToken({
    sub: payload.sub,
  });

  const newRefreshToken = signRefreshToken({
    sub: payload.sub,
    sid: newSession._id.toString(),
  });

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

export const AuthService = {
  loginWithEmailAndPassword,
  logout,
  refresh,
};
