import { Router } from "express";

import userRouter from "./users/routes/user.router";
import customerRouter from "./customers/routes/customer.router";
import contactRouter from "./contacts/routes/contact.router";

export const loadModules = (): Router => {
  const mainRouter = Router();

  mainRouter.use("/users", userRouter);
  mainRouter.use("/customers", customerRouter);
  mainRouter.use("/contacts", contactRouter);

  return mainRouter;
};
