import "reflect-metadata";

import dotenv from "dotenv";

import { AppDataSource } from "./config/database";
import { logger } from "./config/logger";
import app from "./app";

dotenv.config();

process.on("unhandledRejection", (reason: Error | never) => {
  logger.error(`Unhandled Rejection: ${reason.message || reason}`);
});

process.on("uncaughtException", (error: Error) => {
  logger.error(`Uncaught Exception: ${error.message}`);
});

const connectServices = async (): Promise<void> => {
  await AppDataSource.initialize()
  console.log(`*    DB Connection: OK`);

    // Start Express server.
    const server = app.listen(app.get("port"), () => {
      console.log(
        "  App is running at http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
      );
      console.log("  Press CTRL-C to stop\n");
    });  
}

connectServices().catch ((error) => {
  console.error(error);
  logger.error(error);    
});

