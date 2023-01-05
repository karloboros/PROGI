import { BAD_REQUEST, CREATED, OK } from 'http-status';
import { NextFunction, Request, Response } from 'express';
import { ApprovalStatus } from 'club/types';
import errorMessages from 'shared/constants/errorMessages';
import HttpError from 'shared/error/httpError';
import { UserCourse } from 'shared/database';

const getPending = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courseId = req.params.courseId;
    const candidates = await UserCourse.findAll({ where: { courseId, status: ApprovalStatus.Pending } });
    return res.status(OK).json({ ...candidates });
  } catch {
    return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
  }
};

const getApproved = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courseId = req.params.courseId;
    const candidates = await UserCourse.findAll({ where: { courseId, status: ApprovalStatus.Approved } });
    return res.status(OK).json({ ...candidates });
  } catch {
    return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
  }
};
const getRejected = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courseId = req.params.courseId;
    const candidates = await UserCourse.findAll({ where: { courseId, status: ApprovalStatus.Rejected } });
    return res.status(OK).json({ ...candidates });
  } catch {
    return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
  }
};

const updateStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, isApproved } = req.params;
    const candidate = await UserCourse.findOne({ where: { id } });
    if (!candidate) return res.status(404).send('Nema takvog UserCoursea');
    if (isApproved === '1') {
      candidate.status = ApprovalStatus.Approved;
    } else if (isApproved === '2') {
      candidate.status = ApprovalStatus.Rejected;
    } else {
      return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
    }
    await candidate.save();
    return res.status(OK).send('Uspješno promjenjen status prihvaćenosti kandidata!');
  } catch {
    return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
  }
};

const getForUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId;
    const applications = await UserCourse.findAll({ where: { userId } });
    if (!applications) return res.send('Trenutno nemate aktivnih prijava na tečajeve!');
    return res.status(OK).json({ ...applications });
  } catch {
    return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
  }
};

const send = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, courseId } = req.params;
    const application = {
      status: ApprovalStatus.Pending,
      userId,
      courseId,
    };
    UserCourse.create(application);
    return res.status(CREATED).send('Uspješno ste poslali prijavu za tečaj!');
  } catch {
    return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
  }
};
export { getPending, getApproved, getRejected, getForUser, send, updateStatus };
