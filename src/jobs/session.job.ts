import Session from "@/models/session.model.js";
import { Cron } from "croner";

export const sessionCleanupJob = new Cron(
  "0 0 * * * *",
  {
    name: "session-cleanup",
    timezone: "Asia/Bangkok",
  },
  async (self) => {
    const start = Date.now();

    console.log(`[CRON] [${self.name}]: started`);

    try {
      const result = await Session.deleteMany({
        revokedAt: { $ne: null },
        expiresAt: { $lt: new Date() },
      });

      const duration = Date.now() - start;

      console.log(`[CRON] [${self.name}]: completed`, {
        deletedCount: result.deletedCount,
        duration: `${duration}ms`,
        time: new Date().toISOString(),
      });
    } catch (err) {
      const duration = Date.now() - start;

      console.error(`[CRON] [${self.name}]: failed`, {
        error: err,
        duration: `${duration}ms`,
        time: new Date().toISOString(),
      });
    }
  },
);
