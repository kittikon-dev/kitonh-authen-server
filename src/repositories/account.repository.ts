import type { IAccount } from "@/models/account.model.js";
import Account from "@/models/account.model.js";
import type { ClientSession } from "mongoose";

const create = async (data: Partial<IAccount>, session?: ClientSession) => {
  const account = new Account(data);
  return await account.save({ session: session ?? null });
};

const update = async (id: string, data: Partial<IAccount>) => {
  return await Account.findByIdAndUpdate(id, data, { new: true });
};

const findById = async (id: string) => {
  return await Account.findById(id);
};

const findByEmail = async (email: string) => {
  return await Account.findOne({ email });
};

const findByUsername = async (username: string) => {
  return await Account.findOne({ username });
};

export const AccountRepository = {
  create,
  update,
  findById,
  findByEmail,
  findByUsername,
};
