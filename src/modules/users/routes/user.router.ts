import express, { Request, Response } from "express";
import { body, param, query } from "express-validator";

import { asyncHandler } from "../../shared/helpers/helpers";
import { container } from "../../shared/IoC/container";
import { TOKENS } from "../../shared/IoC/tokens";
import { jwtMiddleware } from "../../shared/middlewares/jwt.middleware";
import { validate } from "../../shared/middlewares/validation.middleware";
import { IUserController } from "../contracts/user.contract";

const userRouter = express.Router();
// console.log("container UserRouter: ", container);

const userController = container.resolve<IUserController>(TOKENS.IUserController);

// Middleware común
// userRouter.use(jwtMiddleware(["user"]));

userRouter.post("/", [
	// jwtMiddleware(["user"]),
	validate([
		body("username").exists().bail().isString(),
		body("password").exists().bail().isString(),
		body("createdAt").exists().bail().isISO8601(),
		body("authStrategy").exists().bail().isString(),
	]),
	asyncHandler((req: Request, res: Response) => userController.insert(req, res)),
]);

userRouter.get("/", [
	asyncHandler((req: Request, res: Response) => userController.getList(req, res)),
]);

userRouter.get("/:id", [
	validate([param("id").exists().bail().isNumeric()]),
	asyncHandler((req: Request, res: Response) => userController.getById(req, res)),
]);

userRouter.put("/:id", [
	validate([
		param("id").exists().bail().isNumeric(),
		body("username").optional().isString(),
		body("password").optional().isString(),
	]),
	asyncHandler((req: Request, res: Response) => userController.update(req, res)),
]);

userRouter.delete("/:id", [
	validate([param("id").exists().bail().isNumeric()]),
	asyncHandler((req: Request, res: Response) => userController.delete(req, res)),
]);

export default userRouter;
