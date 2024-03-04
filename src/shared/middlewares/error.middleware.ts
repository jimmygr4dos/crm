import express, { RequestHandler } from "express";
import { logger } from "../../config/logger";

export const ErrorMiddleware = (
  err: Error,
  req: express.Request,
  res: express.Response
): express.Response => {
  logger.error(err);

  return res.status(500).json({
    msg: process.env.NODE_ENV === "DEV" ? err.message : "Error",
  });
};

export const NotFoundMiddleware: RequestHandler = (
  req: express.Request,
  res: express.Response
) => {
  return res.status(404).json({
    msg: "Not Found",
  });
};
