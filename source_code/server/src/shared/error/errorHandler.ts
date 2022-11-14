import { NextFunction, Request, Response } from 'express';
import HttpError from './httpError';
import { IHttpError } from './types';
import { INTERNAL_SERVER_ERROR } from 'http-status';

const DEFAULT_ERROR = new HttpError(INTERNAL_SERVER_ERROR, 'Something went wrong');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err: IHttpError, _req: Request, res: Response, _next: NextFunction) => {
  const error = err.status ? err : DEFAULT_ERROR;
  return res.status(error.status).json({ message: error.message });
};

export default errorHandler;
