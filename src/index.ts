import { Router } from "express";

import userRouter from "./routes/user.router";
import customerRouter from "./routes/customer.router";
import contactRouter from "./routes/contact.router";

export const loadModules = (): Router => {
  const mainRouter = Router();

  mainRouter.use("/users", userRouter);
  mainRouter.use("/customers", customerRouter);
  mainRouter.use("/contacts", contactRouter);

  return mainRouter;
};
