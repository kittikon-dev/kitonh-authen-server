import type { IAccountPassword } from "@/models/account-password.model.js";
import AccountPassword from "@/models/account-password.model.js";
import mongoose, { type ClientSession } from "mongoose";

const create = async (
  data: Partial<IAccountPassword>,
  session?: ClientSession,
) => {
  const accountPassword = new AccountPassword(data);
  return await accountPassword.save({ session: session ?? null });
};

const update = async (id: string, data: Partial<IAccountPassword>) => {
  return await AccountPassword.findByIdAndUpdate(id, data, { new: true });
};

const findByAccountId = async (accountId: string) => {
  return await AccountPassword.findOne({
    accountId: new mongoose.Types.ObjectId(accountId),
    isActive: true,
  });
};

export const AccountPasswordRepository = {
  create,
  update,
  findByAccountId,
};
