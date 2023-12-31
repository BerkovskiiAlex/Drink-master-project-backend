/** @format */

import express from "express";
import logger from "morgan";
import cors from "cors";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert { type: "json" };

import authRouter from "./routes/api/auth-router.js";
import filtersRouter from "./routes/api/filters-router.js";
import drinksRouter from "./routes/api/drinks-router.js";
import policyPublicRouter from "./routes/api/policy-public-router.js";
import applicationRouter from "./routes/api/application-router.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/auth", authRouter);

app.use("/api/filters", filtersRouter);
app.use("/api/drinks", drinksRouter);
app.use("/api/privacy", policyPublicRouter);
app.use("/api", applicationRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message } = err;
  res.status(status).json({
    message,
  });
});

export default app;
