import { BAD_REQUEST, OK } from 'http-status';
import { NextFunction, Request, Response } from 'express';
import { ApprovalStatus } from 'club/types';
import errorMessages from 'shared/constants/errorMessages';
import HttpError from 'shared/error/httpError';
import { TrainerApplication } from 'shared/database';

const send = async (req: Request, res: Response, next: NextFunction) => {
  const { motivationalLetter, certificate } = req.body;
  const { userId, clubId } = req.params;
  if (!(motivationalLetter || certificate)) {
    return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
  }
  try {
    const application = {
      motivationalLetter,
      certificate,
      status: ApprovalStatus.Pending,
      trainerId: userId,
      clubId,
    };
    TrainerApplication.create(application);
    return res.status(OK).send('Uspješno ste poslali prijavu!');
  } catch {
    return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
  }
};

const updateStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, isApproved } = req.params;
    const application = await TrainerApplication.findOne({ where: { id } });
    if (!application) return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
    if (isApproved === '1') {
      application.status = ApprovalStatus.Approved;
    } else if (isApproved === '2') {
      application.status = ApprovalStatus.Rejected;
    } else {
      return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
    }
    await application.save();
    return res.status(OK).send('Uspješno promijenjen status trenera!');
  } catch (err) {
    return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
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

const getRejected = async (req: Request, res: Response) => {
  const clubId = req.params.clubId;
  const rejectedApplications = await TrainerApplication.scope(['rejected', 'includeTrainer']).findAll({
    where: { clubId },
  });
  return res.send(rejectedApplications);
};

export { send, updateStatus, getPending, getAccepted, getRejected };
