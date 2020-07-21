import { Router, Request, Response } from "express";
import * as ErrorHandler from "../utils/ErrorHandler";
import { NextFunction } from "connect";

const handle404Error = (router: Router) => {
  router.use((req: Request, res: Response) => {
    ErrorHandler.notFoundError();
  });
};

const handle401Error = (router: Router) => {
  router.use((req: Request, res: Response) => {
    ErrorHandler.unauthorizedError();
  });
};

const handleClientError = (router: Router) => {
  router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    ErrorHandler.clientError(err, res, next);
  });
};

const handleServerError = (router: Router) => {
  router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    ErrorHandler.serverError(err, res, next);
  });
};

export default [
  handle404Error,
  handle401Error,
  handleClientError,
  handleServerError,
];
