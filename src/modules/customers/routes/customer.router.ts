import express, { Request, Response } from "express";
import { body, param, query } from "express-validator";

import { asyncHandler } from "../../shared/helpers/helpers";
import { container } from "../../shared/IoC/container";
import { TOKENS } from "../../shared/IoC/tokens";
import { jwtMiddleware } from "../../shared/middlewares/jwt.middleware";
import { validate } from "../../shared/middlewares/validation.middleware";
import { ICustomerController } from "../contracts/customer.contract";

const customerRouter = express.Router();
const customerController = container.resolve<ICustomerController>(TOKENS.ICustomerController);

// Middleware común
// customerRouter.use(jwtMiddleware(["customer"]));

customerRouter.post("/", [
	// jwtMiddleware(["customer"]),
	validate([
		body("tinNumber").exists().bail().isString(),
		body("companyName").exists().bail().isString(),
		body("address").exists().bail().isString(),
		body("createdAt").exists().bail().isISO8601(),
		body("createdBy").exists().bail().isString(),
	]),
	asyncHandler((req: Request, res: Response) => customerController.insert(req, res)),
]);

customerRouter.get("/", [
	asyncHandler((req: Request, res: Response) => customerController.getList(req, res)),
]);

customerRouter.get("/:id", [
	validate([param("id").exists().bail().isNumeric()]),
	asyncHandler((req: Request, res: Response) => customerController.getById(req, res)),
]);

customerRouter.put("/:id", [
	validate([
		param("id").exists().bail().isNumeric(),
		body("tinNumber").optional().isString(),
		body("companyName").optional().isString(),
		body("address").optional().isString(),
	]),
	asyncHandler((req: Request, res: Response) => customerController.update(req, res)),
]);

customerRouter.delete("/:id", [
	validate([param("id").exists().bail().isNumeric()]),
	asyncHandler((req: Request, res: Response) => customerController.delete(req, res)),
]);

export default customerRouter;
