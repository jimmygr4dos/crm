import * as express from "express";
import { Response } from "express";

import { logger } from "../../config/logger";

export abstract class BaseController {
	/**
	 * This is the implementation that we will leave to the
	 * subclasses to figure out.
	 */
	public static jsonResponse(res: express.Response, code: number, message: string): Response {
		return res.status(code).json({ message });
	}

	protected ok<T>(res: express.Response, dto?: T): Response {
		if (dto) {
			res.type("application/json");
			return res.status(200).json(dto);
		}

		return res.sendStatus(200);
	}

	protected created<T>(res: express.Response, dto?: T): Response {
		if(dto) {
			res.type("application/json");
			return res.status(201).json(dto);
		}
		return res.sendStatus(201);
	}

	protected clientError(res: express.Response, message?: string): Response {
		return BaseController.jsonResponse(res, 400, message ? message : "Unauthorized");
	}

	protected unauthorized(res: express.Response, message?: string): Response {
		return BaseController.jsonResponse(res, 401, message ? message : "Unauthorized");
	}

	protected paymentRequired(res: express.Response, message?: string): Response {
		return BaseController.jsonResponse(res, 402, message ? message : "Payment required");
	}

	protected unprocessable(res: express.Response, message?: string): Response {
		return BaseController.jsonResponse(
			res,
			422,
			message ? message : "Error on request body|query|param"
		);
	}

	protected forbidden(res: express.Response, message?: string): Response {
		return BaseController.jsonResponse(res, 403, message ? message : "Forbidden");
	}

	protected notFound(res: express.Response, message?: string): Response {
		return BaseController.jsonResponse(res, 404, message ? message : "Not found");
	}

	protected conflict(res: express.Response, message?: string): Response {
		return BaseController.jsonResponse(res, 409, message ? message : "Conflict");
	}

	protected tooMany(res: express.Response, message?: string): Response {
		return BaseController.jsonResponse(res, 429, message ? message : "Too many requests");
	}

	protected todo(res: express.Response): Response {
		return BaseController.jsonResponse(res, 400, "TODO");
	}

	protected fail(res: express.Response, error: Error | string): Response {
		logger.error(error);

		return res.status(500).json({
			message: error.toString(),
		});
	}
}
