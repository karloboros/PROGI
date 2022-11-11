import { CONFLICT, CREATED, OK, UNAUTHORIZED } from 'http-status';
import { NextFunction, Request, Response } from 'express';
import errorMessages from 'shared/constants/errorMessages';
import HttpError from 'shared/error/httpError';
import { setAuthCookies } from 'shared/helpers/tokens';
import { UniqueConstraintError } from 'sequelize';
import { User } from 'shared/database';

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  const user = await User.unscoped().findOne({ where: { username } });
  if (!user) return next(new HttpError(UNAUTHORIZED, errorMessages.SIGN_IN));

  const isPasswordCorrect = await user.passwordCompare(password);
  if (!isPasswordCorrect) return next(new HttpError(UNAUTHORIZED, errorMessages.SIGN_IN));

  const tokens = await user.generateTokens();
  setAuthCookies(tokens, res);

  return res.status(OK).json(user.profile);
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.create(req.body);

    const tokens = await user.generateTokens();
    setAuthCookies(tokens, res);

    return res.status(CREATED).json({ ...user.profile });
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      return next(new HttpError(CONFLICT, errorMessages.REGISTER));
    }
    return next(new Error());
  }
};

export { login, register };
