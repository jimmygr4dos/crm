import dotenv from "dotenv";
import express, { RequestHandler } from "express";
import jwt from "jsonwebtoken";

import { loadCredentials } from "../../../config/enviroment";

dotenv.config();

const { JWT_TOKEN_PASS } = loadCredentials();

export const jwtMiddleware = (usersAllow: string[]): RequestHandler => {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const token = req.header("Authorization")?.replace("Bearer ", "");

      if (!token) {
        throw new Error();
      }

      const decoded = jwt.verify(token, JWT_TOKEN_PASS);

      if (!usersAllow.includes(decoded["_id"] as string)) {
        throw new Error();
      }

      next();
    } catch (err: unknown) {
      res.status(401).send("Authentication Error");
    }
  };
};
