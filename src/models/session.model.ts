import mongoose, { Schema, Types } from "mongoose";

export interface ISession {
  accountId: Types.ObjectId;
  sessionHash: string;
  isActive: boolean;
  userAgent?: string;
  ipAddress?: string;
  expiresAt: Date;
  lastUsedAt?: Date;
  revokedAt?: Date;
}

const sessionSchema = new Schema<ISession>(
  {
    accountId: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    sessionHash: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    userAgent: { type: String },
    ipAddress: { type: String },
    expiresAt: { type: Date, required: true },
    lastUsedAt: { type: Date, default: Date.now },
    revokedAt: { type: Date },
  },
  { timestamps: true, versionKey: false, collection: "sessions" },
);

const Session = mongoose.model<ISession>("Session", sessionSchema);
export default Session;
