import * as dotenv from 'dotenv';
import { JsonWebTokenError, JwtPayload, verify as jwtVerify, TokenExpiredError } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import Audience from './audience';
import errorMessages from 'shared/constants/errorMessages';
import { FORBIDDEN } from 'http-status';
import HttpError from 'shared/error/httpError';
import { User } from 'shared/database';

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

const authenticate = async (req: Request, _res: Response, next: NextFunction) => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    return next(new HttpError(FORBIDDEN, errorMessages.FORBIDDEN));
  }

  try {
    const { id, aud } = jwtVerify(accessToken, ACCESS_TOKEN_SECRET) as JwtPayload;
    if (aud !== Audience.Scope.Access) {
      return next(new HttpError(FORBIDDEN, errorMessages.FORBIDDEN));
    }

    const user = await User.findByPk(id);
    if (!user) {
      return next(new HttpError(FORBIDDEN, errorMessages.FORBIDDEN));
    }

    req.user = user;

    return next();
  } catch (err) {
    if (err instanceof TokenExpiredError) return next();

    if (err instanceof JsonWebTokenError) {
      return next(new HttpError(FORBIDDEN, errorMessages.FORBIDDEN));
    }
  }
};

export default authenticate;
