import mongoose, { Schema, Types } from "mongoose";

export interface ISession {
  accountId: Types.ObjectId;
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
      index: true,
    },
    isActive: { type: Boolean, default: true },
    userAgent: { type: String },
    ipAddress: { type: String },
    expiresAt: { type: Date, required: true },
    lastUsedAt: { type: Date, default: Date.now },
    revokedAt: { type: Date },
  },
  { timestamps: true, versionKey: false, collection: "sessions" },
);

sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Session = mongoose.model<ISession>("Session", sessionSchema);
export default Session;
