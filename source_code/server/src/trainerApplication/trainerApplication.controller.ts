import { BAD_REQUEST, NOT_FOUND, OK } from 'http-status';
import { NextFunction, Request, Response } from 'express';
import { TrainerApplication, User } from 'shared/database';
import { ApprovalStatus } from 'club/types';
import errorMessages from 'shared/constants/errorMessages';
import HttpError from 'shared/error/httpError';
import { Role } from 'user/types';

const fetchApproved = async (req: Request, res: Response) => {
  const { clubId } = req.params;
  const approvedApplications = await TrainerApplication.scope(['approved', 'includeTrainer']).findAll({
    where: { clubId },
  });
  return res.status(OK).json(approvedApplications);
};

const fetchPending = async (req: Request, res: Response) => {
  const { clubId } = req.params;
  const pendingApplications = await TrainerApplication.scope(['pending', 'includeTrainer']).findAll({
    where: { clubId },
  });
  return res.status(OK).json(pendingApplications);
};

const apply = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { motivationalLetter, certificate } = req.body;
    if (!(motivationalLetter || certificate)) return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));

    const { user } = req;
    const trainer = await User.findOne({ where: { id: user.id } });
    if (!trainer) return next(new HttpError(NOT_FOUND, errorMessages.NOT_FOUND));

    const { clubId } = req.params;
    const application = {
      motivationalLetter,
      certificate,
      status: ApprovalStatus.Pending,
      trainerId: user.id,
      clubId,
    };
    const trainerApplication = await TrainerApplication.create(application);
    return res.status(OK).json(trainerApplication);
  } catch (err) {
    return next(err);
  }
};

const updateStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { isApproved } = req.body;
    const { id } = req.params;
    const application = await TrainerApplication.scope('includeClub').findByPk(id);
    if (!application) return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
    application.status = isApproved ? ApprovalStatus.Approved : ApprovalStatus.Rejected;
    await application.save();

    if (isApproved) {
      const trainer = await User.findOne({ where: { id: application.trainerId } });
      if (!trainer) return next(new HttpError(NOT_FOUND, errorMessages.NOT_FOUND));
      trainer.role = Role.Trainer;
      await trainer.save();
    }
    return res.status(OK).send('Approval status changed successfully');
  } catch (err) {
    return next(err);
  }
};

const uploadPDF = (req: Request, res: Response, next: NextFunction) => {
  const { file } = req;
  if (!file) return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));

  return res.status(OK);
};

export { fetchApproved, fetchPending, apply, updateStatus, uploadPDF };
