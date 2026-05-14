import { createAccountSchema } from "@/dtos/createAccount.dto.js";
import { ERROR_CODES } from "@/errors/errors-codes.js";
import { HttpError } from "@/errors/http-error.js";
import accountService from "@/services/account.service.js";
import type { Request, Response } from "express";

const handleCreateAccount = async (req: Request, res: Response) => {
  const result = createAccountSchema.safeParse(req.body);
  if (!result.success) {
    throw new HttpError(ERROR_CODES.VALIDATION_FAILED);
  }

  const { email, username, password } = result.data;
  await accountService.createAccount({
    email,
    username,
    password,
  });

  return res
    .status(201)
    .json({ message: "Account created successfully", data: null });
};

export const AccountController = {
  handleCreateAccount,
};
