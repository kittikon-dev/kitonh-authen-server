import mongoose, { Schema, Types } from "mongoose";

export interface IAccountPassword {
  accountId: Types.ObjectId;
  passwordHash: string;
  isActive: boolean;
}

const accountPasswordSchema = new Schema(
  {
    accountId: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      required: true,
      unique: true,
    },
    passwordHash: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false, collection: "account_passwords" },
);

const AccountPassword = mongoose.model<IAccountPassword>(
  "AccountPassword",
  accountPasswordSchema,
);
export default AccountPassword;
