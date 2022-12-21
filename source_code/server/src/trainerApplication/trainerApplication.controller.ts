import errorMessages from 'shared/constants/errorMessages';
import HttpError from 'shared/error/httpError';
// eslint-disable-next-line sort-imports
import { BAD_REQUEST, CONFLICT, FORBIDDEN } from 'http-status';
import { NextFunction, Request, Response } from 'express';
import { TrainerApplication } from 'shared/database';
import { UniqueConstraintError } from 'sequelize';

const sendApplication = async (req: Request, res: Response) => {
  if (req.body.motivationalLetter && req.body.certificate) {
    try {
      const application = {
        motivationalLetter: req.body.motivationalLetter,
        certificate: req.body.certificate,
        status: 0,
        trainerId: req.params.userId,
        clubId: req.params.clubId,
      };
      TrainerApplication.create(application);
      return res.status(200).json({ ...application });
    } catch {
      return res.status(CONFLICT);
    }
  } else return res.status(CONFLICT);
};

const acceptApplication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const application = await TrainerApplication.findOne({ where: { id: req.params.id } });
    if (!application) return next(new HttpError(FORBIDDEN, errorMessages.FORBIDDEN));
    application.status = 1;
    await application.save();
    return res.status(200).json({ ...application });
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      return next(new HttpError(CONFLICT, errorMessages.UNIQUE));
    }
  }
};

const denyApplication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const application = await TrainerApplication.findOne({ where: { id: req.params.id } });
    if (!application) return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
    application.status = 2;
    await application.save();
    return res.status(200).json({ ...application });
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      return next(new HttpError(CONFLICT, errorMessages.UNIQUE));
    }
  }
};

export { sendApplication, acceptApplication, denyApplication };
