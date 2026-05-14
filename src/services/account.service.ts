import { ERROR_CODES } from "@/errors/errors-codes.js";
import { HttpError } from "@/errors/http-error.js";
import { AccountRepository } from "@/repositories/account.repository.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import type { CreateAccountInput } from "@/dtos/accounts/createAccount.dto.js";
import { AccountPasswordRepository } from "@/repositories/account-password.repository.js";

const createAccount = async (dto: CreateAccountInput) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Check if an account with the same email already exists
    const exitsingAccount = await AccountRepository.findByEmail(dto.email);
    if (exitsingAccount) {
      throw new HttpError(ERROR_CODES.ACCOUNT_ALREADY_EXISTS);
    }

    const account = await AccountRepository.create(
      {
        email: dto.email,
        username: dto.username,
        isActive: true,
      },
      session,
    );

    // hash password
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    await AccountPasswordRepository.create(
      {
        accountId: account._id,
        passwordHash: hashedPassword,
        isActive: true,
      },
      session,
    );

    await session.commitTransaction();
    return account;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const AccountService = {
  createAccount,
};
