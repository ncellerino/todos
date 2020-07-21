import { NextFunction, Response } from "express";
import { HTTP404Error, HTTPClientError, HTTP401Error } from "./HttpErrors";
import { logger } from "../config/logger/Logger";

export const notFoundError = () => {
  throw new HTTP404Error("Resource not found.");
};

export const unauthorizedError = () => {
  throw new HTTP401Error("Unauthorized");
};

export const clientError = (err: Error, res: Response, next: NextFunction) => {
  if (err instanceof HTTPClientError) {
    logger.warn(err);

    res.status(err.statusCode).send(err.message);
  } else {
    next(err);
  }
};

export const serverError = (err: Error, res: Response, next: NextFunction) => {
  logger.error(err);
  if (process.env.NODE_ENV === "production") {
    res.status(500).send("Internal Server Error");
  } else {
    res.status(500).send(err.stack);
  }
};
