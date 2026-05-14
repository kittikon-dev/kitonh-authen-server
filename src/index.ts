import "dotenv/config";
import express from "express";
import { ENVI } from "./configs/envi.js";
import connectToDatabase from "./configs/db.js";
import setupDNS from "./configs/dns.js";
import app from "./app.js";

const port = ENVI.PORT;

setupDNS();
connectToDatabase();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
