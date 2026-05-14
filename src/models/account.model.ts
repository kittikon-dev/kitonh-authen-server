import mongoose, { Schema } from "mongoose";

export interface IAccount {
  email: string;
  username: string;
  isActive: boolean;
}

const accountSchema = new Schema<IAccount>(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false, collection: "accounts" },
);

const Account = mongoose.model<IAccount>("Account", accountSchema);
export default Account;
