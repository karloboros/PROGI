import { BAD_REQUEST, CREATED, NOT_FOUND, OK } from 'http-status';
import { Club, User, UserCourse } from 'shared/database';
import { NextFunction, Request, Response } from 'express';
import { ApprovalStatus } from 'club/types';
import errorMessages from 'shared/constants/errorMessages';
import HttpError from 'shared/error/httpError';

const fetchApproved = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { courseId } = req.params;
    const userCourses = await UserCourse.scope(['accepted', 'includeUser']).findAll({ where: { courseId } });
    return res.status(OK).json(userCourses);
  } catch {
    return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
  }
};

const fetchPending = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { courseId } = req.params;
    const userCourses = await UserCourse.scope(['pending', 'includeUser']).findAll({ where: { courseId } });
    return res.status(OK).json(userCourses);
  } catch {
    return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
  }
};

const apply = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req;
    const foundUser = await User.findOne({ where: { id: user.id } });
    if (!foundUser) return next(new HttpError(NOT_FOUND, errorMessages.NOT_FOUND));
    const { courseId } = req.params;
    const application = {
      status: ApprovalStatus.Pending,
      userId: user.id,
      courseId,
    };
    const userApplication = await UserCourse.create(application);
    return res.status(CREATED).json(userApplication);
  } catch {
    return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
  }
};

const updateStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { isApproved } = req.body;
    const { id } = req.params;
    const userCourse = await UserCourse.scope('includeCourse').findByPk(id);
    if (!userCourse) return next(new HttpError(NOT_FOUND, errorMessages.NOT_FOUND));

    const club = await Club.findByPk(userCourse.course?.clubId);
    if (!club) return next(new HttpError(NOT_FOUND, errorMessages.NOT_FOUND));
    userCourse.status = isApproved ? ApprovalStatus.Approved : ApprovalStatus.Rejected;
    await userCourse.save();

    return res.status(OK).send('Application status changed successfully!');
  } catch {
    return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
  }
};

export { fetchApproved, fetchPending, apply, updateStatus };
