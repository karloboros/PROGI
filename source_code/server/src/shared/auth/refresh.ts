import { JsonWebTokenError, JwtPayload, verify as jwtVerify, TokenExpiredError } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import Audience from './audience';
import errorMessages from 'shared/constants/errorMessages';
import { FORBIDDEN } from 'http-status';
import HttpError from 'shared/error/httpError';
import { setAuthCookies } from 'shared/helpers/tokens';
import { User } from 'shared/database';

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

const refresh = async (req: Request, res: Response, next: NextFunction) => {
  if (req.user) return next();

  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return next(new HttpError(FORBIDDEN, errorMessages.FORBIDDEN));
  }

  try {
    const user = await User.findOne({ where: { refreshToken } });
    const { id, username, aud } = jwtVerify(refreshToken, REFRESH_TOKEN_SECRET) as JwtPayload;

    if (!user || id !== user.id || username !== user.username || aud !== Audience.Scope.Refresh) {
      return next(new HttpError(FORBIDDEN, errorMessages.FORBIDDEN));
    }

    req.user = user;

    const tokens = await user.generateTokens();
    setAuthCookies(tokens, res);

    return next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return next(new HttpError(FORBIDDEN, errorMessages.TOKEN_EXPIRED));
    }

    if (err instanceof JsonWebTokenError) {
      return next(new HttpError(FORBIDDEN, errorMessages.FORBIDDEN));
    }
  }
};

export default refresh;
