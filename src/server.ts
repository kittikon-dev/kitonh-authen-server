import "dotenv/config";
import { ENVI } from "./configs/envi.js";
import connectToDatabase from "./configs/db.js";
import setupDNS from "./configs/dns.js";
import app from "./app.js";

import "@/jobs/session.job.js";

const port = ENVI.PORT;

const startServer = async () => {
  console.log("Starting server...");

  setupDNS();
  connectToDatabase();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer();
