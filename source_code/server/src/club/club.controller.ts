import { NextFunction, Request, Response } from 'express';
import sequelize, { Club, Location } from 'shared/database';
import { ApprovalStatus } from './types';
import { OK } from 'http-status';

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
    await transaction.commit();
    return res.status(OK).json(club);
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};

export { create };
