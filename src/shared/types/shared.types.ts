import express from "express";

export type AsyncRequestHandler = (
	req: express.Request,
	res: express.Response,
	next?: express.NextFunction
) => Promise<express.Response | undefined | void>;
