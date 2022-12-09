import { BAD_REQUEST, CONFLICT, NOT_FOUND, OK } from 'http-status';
import { NextFunction, Request, Response } from 'express';
import sequelize, { Club, User } from 'shared/database';
import { ApprovalStatus } from 'club/types';
import errorMessages from 'shared/constants/errorMessages';
import HttpError from 'shared/error/httpError';
import TrainerApplicationModel from './trainerApplication.model';
import { UniqueConstraintError } from 'sequelize';

const create = async (req: Request, res: Response, next: NextFunction) => {
  const transaction = await sequelize.transaction();
  try {
    const user = await User.create({ id: req.params.id }, { transaction });
    const club = await Club.create({ id: req.params.id }, { transaction });

    const newTrainerApplication = {
      ...req.body,
      status: ApprovalStatus.Pending,
      ownerId: user.id,
      clubId: club.id,
    };
    const trainerApplication = await TrainerApplicationModel.create(newTrainerApplication, { transaction });
    await transaction.commit();
    return res.status(OK).json(trainerApplication);
  } catch (err) {
    await transaction.rollback();

    if (err instanceof UniqueConstraintError) {
      return next(new HttpError(CONFLICT, errorMessages.REGISTER));
    }
    return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
  }
};

const fetchPending = async (req: Request, res: Response) => {
  const pendingTrainerApplications = await TrainerApplicationModel.scope([
    'pending',
    'includeOwner',
    'includeClub',
  ]).findAll();
  return res.send(pendingTrainerApplications);
};

const updateApprovalStatus = async (req: Request, res: Response, next: NextFunction) => {
  const { id, approvalStatus } = req.body;
  if (!approvalStatus) return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));

  const trainerApplication = await TrainerApplicationModel.findByPk(id);
  if (!trainerApplication) return next(new HttpError(NOT_FOUND, errorMessages.NOT_FOUND));

  try {
    trainerApplication.status = approvalStatus;
    trainerApplication.save();

    return res.sendStatus(OK);
  } catch {
    return next();
  }
};

export { create, fetchPending, updateApprovalStatus };
