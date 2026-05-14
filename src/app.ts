import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error-handler.middleware.js";
import accountRoute from "@/routes/account.route.js";

const app = express();

app.use(express.json());
app.use(cors());

// routes
app.use("/api/accounts", accountRoute);

app.use(errorHandler);

export default app;
