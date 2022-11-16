import { BAD_REQUEST, CONFLICT, CREATED, FORBIDDEN, OK, UNAUTHORIZED } from 'http-status';
import { clearAuthCookies, setAuthCookies } from 'shared/helpers/tokens';
import { NextFunction, Request, Response } from 'express';
import errorMessages from 'shared/constants/errorMessages';
import HttpError from 'shared/error/httpError';
import { Role } from './types';
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
    if (!req.body.role) req.body.role = Role.User;
    const user = await User.create(req.body);

    const tokens = await user.generateTokens();
    setAuthCookies(tokens, res);

    return res.status(CREATED).json({ ...user.profile });
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      return next(new HttpError(CONFLICT, errorMessages.REGISTER));
    }
    return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
  }
};

const logout = (_req: Request, res: Response) => {
  clearAuthCookies(res);
  res.status(OK).send();
};

const edit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body;
    const userToEdit = await User.findByPk(user.id);
    if (!userToEdit) return next(new HttpError(FORBIDDEN, errorMessages.FORBIDDEN));

    userToEdit.username = user.username;
    userToEdit.firstName = user.firstName;
    userToEdit.lastName = user.lastName;
    userToEdit.email = user.email;
    userToEdit.gender = user.gender;
    userToEdit.dateOfBirth = user.dateOfBirth;
    userToEdit.phone = user.phone;
    userToEdit.experienceDescription = user.experienceDescription;
    userToEdit.image = user.image;

    await userToEdit.save();
    return res.status(CREATED).json({ ...userToEdit.profile });
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      return next(new HttpError(CONFLICT, errorMessages.REGISTER));
    }
    return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = req;
  try {
    const userToRemove = await User.scope('includeClub').findByPk(user.id);
    if (!userToRemove) return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
    if (userToRemove.clubs?.length) return next(new HttpError(CONFLICT, errorMessages.CLUB_OWNER_DELETE));

    await userToRemove.destroy();
    res.status(OK).send();
  } catch (err) {
    return next(err);
  }
};

const uploadProfileImage = (req: Request, res: Response, next: NextFunction) => {
  const { file } = req;
  if (!file) return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));

  return res.status(OK).json({ path: file.path });
};

export { login, register, logout, edit, remove, uploadProfileImage };
