import { createAccountSchema } from "@/dtos/accounts/createAccount.dto.js";
import { ERROR_CODES } from "@/errors/errors-codes.js";
import { HttpError } from "@/errors/http-error.js";
import { AccountRepository } from "@/repositories/account.repository.js";
import { AccountService } from "@/services/account.service.js";
import type { Request, Response } from "express";

const handleCreateAccount = async (req: Request, res: Response) => {
  const result = createAccountSchema.safeParse(req.body);
  if (!result.success) {
    throw new HttpError(ERROR_CODES.VALIDATION_FAILED);
  }

  const { email, username, password } = result.data;
  await AccountService.createAccount({
    email,
    username,
    password,
  });

  return res
    .status(201)
    .json({ message: "Account created successfully", data: null });
};

const handleGetMe = async (req: Request, res: Response) => {
  const account = await AccountRepository.findById(req.user!.sub);
  if (!account) {
    throw new HttpError(ERROR_CODES.ACCOUNT_NOT_FOUND);
  }
  return res
    .status(200)
    .json({ message: "Account retrieved successfully", data: account });
};

export const AccountController = {
  handleCreateAccount,
  handleGetMe,
};
