import mongoose from "mongoose";
import { ENVI } from "./envi.js";
import { logger } from "./logger.js";

export default async function connectToDatabase() {
  try {
    logger.info("[DATABASE] connecting to the database.");
    if (!ENVI.DB_URI) {
      throw new Error(
        "[DATABASE] DB_URI is not defined in the environment variables.",
      );
    }
    await mongoose.connect(ENVI.DB_URI);
    logger.info("[DATABASE] Successfully connected to the database.");
  } catch (error) {
    logger.error(error, "[DATABASE] Error connecting to the database:");
  }
}
