export const ENVI = {
  MODE: process.env.MODE || "development",
  PORT: process.env.PORT || 3000,
  DB_URI: process.env.DB_URI || "",
  JWT_SECRET: process.env.JWT_SECRET || "",
};
