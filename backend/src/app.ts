import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { authRoutes } from "./routes/authRoutes.js";
import { leadRoutes } from "./routes/leadRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { env } from "./config/env.js";

export const buildApp = () => {
  const app = express();

  app.use(helmet());
  const allowedOrigins = env.clientOrigin
    ? env.clientOrigin.split(",").map((origin) => origin.trim())
    : [];
  const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    optionsSuccessStatus: 204
  };
  app.use(cors(corsOptions));
  app.options("*", cors(corsOptions));
  app.use(express.json());
  app.use(morgan("dev"));

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/leads", leadRoutes);

  app.use(errorHandler);

  return app;
};

const app = buildApp();
export default app;
