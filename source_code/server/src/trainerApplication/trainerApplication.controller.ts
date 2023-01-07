import { BAD_REQUEST, FORBIDDEN, NOT_FOUND, OK } from 'http-status';
import { NextFunction, Request, Response } from 'express';
import { TrainerApplication, User } from 'shared/database';
import { ApprovalStatus } from 'club/types';
import errorMessages from 'shared/constants/errorMessages';
import HttpError from 'shared/error/httpError';
import { Role } from 'user/types';

const apply = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { motivationalLetter, certificate } = req.body;
    if (!(motivationalLetter || certificate)) return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));

    const { user } = req;
    const trainer = await User.findOne({ where: { id: user.id } });
    if (!trainer) return next(new HttpError(NOT_FOUND, errorMessages.NOT_FOUND));
    if (trainer.role !== Role.User) return next(new HttpError(FORBIDDEN, errorMessages.FORBIDDEN));

    const { clubId } = req.params;
    const application = {
      motivationalLetter,
      certificate,
      status: ApprovalStatus.Pending,
      trainerId: user.id,
      clubId,
    };
    TrainerApplication.create(application);
    return res.status(OK).send('Application was sent successfully');
  } catch (err) {
    return next(err);
  }
};

const updateStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req;
    const { id, isApproved } = req.body;

    const application = await TrainerApplication.scope('includeClub').findByPk(id);
    if (!application) return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
    if (application.club?.ownerId !== user.id) return next(new HttpError(FORBIDDEN, errorMessages.FORBIDDEN));
    application.status = isApproved ? ApprovalStatus.Approved : ApprovalStatus.Rejected;
    await application.save();

    if (isApproved) {
      const trainer = await User.findByPk(user.id);
      if (!trainer) return next(new HttpError(NOT_FOUND, errorMessages.NOT_FOUND));
      trainer.role = Role.Coach;
      await trainer.save();
    }

    return res.status(OK).send('Approval status changed successfully');
  } catch (err) {
    return next(err);
  }
};

const getPending = async (req: Request, res: Response) => {
  const clubId = req.params.clubId;
  const pendingApplications = await TrainerApplication.scope(['pending', 'includeTrainer']).findAll({
    where: { clubId },
  });
  return res.send(pendingApplications);
};

const getAccepted = async (req: Request, res: Response) => {
  const clubId = req.params.clubId;
  const acceptedApplications = await TrainerApplication.scope(['accepted', 'includeTrainer']).findAll({
    where: { clubId },
  });
  return res.send(acceptedApplications);
};

const uploadPDF = (req: Request, res: Response, next: NextFunction) => {
  const { file } = req;
  if (!file) return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));

  return res.status(OK);
};

export { apply, updateStatus, getPending, getAccepted, uploadPDF };
