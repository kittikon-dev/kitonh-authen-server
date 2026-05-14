import type { LoginWithEmailAndPasswordDTO } from "@/dtos/auth/loginWithEmailAndPassword.dto.js";
import { ERROR_CODES } from "@/errors/errors-codes.js";
import { HttpError } from "@/errors/http-error.js";
import AccountPassword from "@/models/account-password.model.js";
import { AccountPasswordRepository } from "@/repositories/account-password.repository.js";
import { AccountRepository } from "@/repositories/account.repository.js";
import { SessionRepository } from "@/repositories/session.repository.js";
import bcrypt from "bcrypt";
import { Types } from "mongoose";
import { signAccessToken } from "@/utils/jwt.js";
import { generateRefreshToken, hashToken } from "@/utils/token.js";

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

    const refreshToken = generateRefreshToken();
    const sessionHash = hashToken(refreshToken);

    const session = await SessionRepository.create({
      accountId: new Types.ObjectId(account._id),
      sessionHash: sessionHash,
      isActive: true,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // expires in 7 days
    });

    const accessToken = signAccessToken({
      accountId: account._id,
      sessionId: session._id,
    });

    return { accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
};

export const AuthService = {
  loginWithEmailAndPassword,
};
