import { seedDefaultCategories } from "./services/seedService.js";
import fastify from "fastify";
import cors from "@fastify/cors";
import fastifySensible from "@fastify/sensible";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDb } from "./config/database.js";
import { appRouter } from "./routes/index.js";

dotenv.config();

const PORT = Number(process.env.PORT) || 5001;
const HOST = process.env.HOST || "0.0.0.0";
const MONGODB_URI = String(process.env.MONGODB_URI);

const app = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
});

await app.register(cors, {
  origin: "*",
});
await app.register(fastifySensible);

await app.register(appRouter, { prefix: "/api/v1" });

app.get("/health", async () => {
  return {
    status: "ok",
    service: "pulse-server",
    dbState:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    timestamp: new Date().toISOString(),
  };
});

const graceFulShutdown = async (signal: string) => {
  app.log.warn(`${signal} received. Shutting down server...`);
  try {
    await app.close();
    app.log.info("HTTP server closed");

    await mongoose.connection.close();
    app.log.info("MongoDB connection closed");

    process.exit(0);
  } catch (error) {
    app.log.error(error, "Error during shutdown:");
    process.exit(1);
  }
};

process.on("SIGINT", () => graceFulShutdown("SIGINT"));
process.on("SIGTERM", () => graceFulShutdown("SIGTERM"));

const start = async () => {
  try {
    await connectDb(MONGODB_URI);
    await seedDefaultCategories();
    await app.listen({ port: PORT, host: HOST });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
