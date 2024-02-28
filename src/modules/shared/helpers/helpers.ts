import { Dayjs } from "dayjs";
import express from "express";

import { AsyncRequestHandler } from "../types/shared.types";

const dateParser = (date: Dayjs): Date => {
  if (!date.isValid()) {
    throw new Error("Invalid Date format");
  }

  return new Date(date.format("YYYY-MM-DDTHH:mm:ss.SSS+0000"));
};

const asyncHandler = (fn: AsyncRequestHandler): AsyncRequestHandler => {
  return (
    req: express.Request,
    res: express.Response,
    next?: express.NextFunction
  ) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export { asyncHandler, dateParser };
