import express from "express";
import { ValidationChain, validationResult } from "express-validator";

import { AsyncRequestHandler } from "../types/shared.types";

// parallel processing
export const validate = (
  validations: ValidationChain[]
): AsyncRequestHandler => {
  return async (
    req: express.Request,
    res: express.Response,
    next?: express.NextFunction
  ): Promise<express.Response | undefined> => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      if (next) {
        next();
      }

      return;
    }

    return res.status(400).json({ errors: errors.array() });
  };
};
