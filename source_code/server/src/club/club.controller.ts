import { BAD_REQUEST, CONFLICT, NOT_FOUND, OK } from 'http-status';
import { NextFunction, Request, Response } from 'express';
import sequelize, { Club, Location, User } from 'shared/database';
import { ApprovalStatus } from './types';
import errorMessages from 'shared/constants/errorMessages';
import HttpError from 'shared/error/httpError';
import { Role } from 'user/types';
import { UniqueConstraintError } from 'sequelize';

const create = async (req: Request, res: Response, next: NextFunction) => {
  const transaction = await sequelize.transaction();
  try {
    const { address } = req.body;
    const location = await Location.create({ name: address }, { transaction });

    const newClub = {
      ...req.body,
      approvalStatus: ApprovalStatus.Pending,
      ownerId: req.user.id,
      locationId: location.id,
    };
    const club = await Club.create(newClub, { transaction });
    const user = await User.findByPk(req.user.id);
    if (!user) return next(new HttpError(NOT_FOUND, errorMessages.NOT_FOUND));
    user.role = Role.ClubOwner;
    user.save();

    await transaction.commit();
    return res.status(OK).json(club);
  } catch (err) {
    await transaction.rollback();

    if (err instanceof UniqueConstraintError) {
      return next(new HttpError(CONFLICT, errorMessages.REGISTER));
    }
    return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
  }
};

const fetchPending = async (_req: Request, res: Response) => {
  const pendingClubs = await Club.scope(['pending', 'includeOwner', 'includeLocation']).findAll();
  return res.send(pendingClubs);
};

const fetchApproved = async (_req: Request, res: Response) => {
  const clubs = await Club.scope(['approved', 'includeOwner']).findAll();
  return res.send(clubs);
};

const updateApprovalStatus = async (req: Request, res: Response, next: NextFunction) => {
  const { id, approvalStatus } = req.body;
  if (!approvalStatus) return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));

  const club = await Club.findByPk(id);
  if (!club) return next(new HttpError(NOT_FOUND, errorMessages.NOT_FOUND));

  try {
    club.approvalStatus = approvalStatus;
    club.save();

    return res.sendStatus(OK);
  } catch {
    return next();
  }
};

export { create, fetchApproved, fetchPending, updateApprovalStatus };
