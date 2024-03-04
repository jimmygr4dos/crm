import express, { Request, Response } from "express";
import { body, param, query } from "express-validator";

import { asyncHandler } from "../shared/helpers/helpers";
import { container } from "../shared/IoC/container";
import { TOKENS } from "../shared/IoC/tokens";
import { jwtMiddleware } from "../shared/middlewares/jwt.middleware";
import { validate } from "../shared/middlewares/validation.middleware";
import { IContactController } from "../contracts/contact.contract";

const contactRouter = express.Router();
const contactController = container.resolve<IContactController>(TOKENS.IContactController);

// Middleware común
// contactRouter.use(jwtMiddleware(["contact"]));

contactRouter.post("/", [
	// jwtMiddleware(["customer"]),
	validate([
		body("firstName").exists().bail().isString(),
		body("lastName").exists().bail().isString(),
		body("personalEmail").optional().isEmail(),
		body("businessEmail").exists().bail().isEmail(),
		body("customerId").exists().bail().isNumeric(),
		body("createdAt").exists().bail().isISO8601(),
		body("createdBy").exists().bail().isString(),
	]),
	asyncHandler((req: Request, res: Response) => contactController.insert(req, res)),
]);

contactRouter.get("/", [
	asyncHandler((req: Request, res: Response) => contactController.getList(req, res)),
]);

contactRouter.get("/:id", [
	validate([param("id").exists().bail().isNumeric()]),
	asyncHandler((req: Request, res: Response) => contactController.getById(req, res)),
]);

contactRouter.put("/:id", [
	validate([
		param("id").exists().bail().isNumeric(),
		body("firstName").optional().isString(),
		body("lastName").optional().isString(),
		body("personalEmail").optional().isEmail(),
		body("businessEmail").optional().isEmail(),
		body("curtomerId").optional().isNumeric(),
	]),
	asyncHandler((req: Request, res: Response) => contactController.update(req, res)),
]);

contactRouter.delete("/:id", [
	validate([param("id").exists().bail().isNumeric()]),
	asyncHandler((req: Request, res: Response) => contactController.delete(req, res)),
]);

contactRouter.get("/customer/:customerId", [
	validate([param("customerId").exists().bail().isNumeric()]),
	asyncHandler((req: Request, res: Response) => contactController.getByCustomerId(req, res)),
]);

export default contactRouter;
