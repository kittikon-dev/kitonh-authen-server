import Session, { type ISession } from "@/models/session.model.js";

const create = async (data: Partial<ISession>) => {
  const session = new Session(data);
  return await session.save();
};

const updateLastUsed = async (id: string) => {
  return await Session.findByIdAndUpdate(
    id,
    { lastUsedAt: new Date() },
    { returnDocument: "after" },
  );
};

const findById = async (id: string) => {
  return await Session.findById(id);
};

const revoke = async (id: string) => {
  const session = await Session.findOneAndUpdate(
    { _id: id, isActive: true },
    { isActive: false, revokedAt: new Date() },
    { returnDocument: "after" },
  );
  return session;
};

export const SessionRepository = {
  create,
  updateLastUsed,
  findById,
  revoke,
};
