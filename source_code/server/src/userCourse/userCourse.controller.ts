import { BAD_REQUEST, CONFLICT, CREATED, NOT_FOUND, OK } from 'http-status';
import { Club, UserCourse } from 'shared/database';
import { NextFunction, Request, Response } from 'express';
import { ApprovalStatus } from 'club/types';
import errorMessages from 'shared/constants/errorMessages';
import HttpError from 'shared/error/httpError';

const fetchApproved = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { courseId } = req.params;
    const userCourses = await UserCourse.scope(['approved', 'includeUser']).findAll({ where: { courseId } });
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

const fetchByCourseId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;
    const userCourse = await UserCourse.findOne({ where: { userId, courseId } });
    return res.status(OK).json(userCourse);
  } catch {
    return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
  }
};

const apply = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;
    const userCourseToAdd = {
      status: ApprovalStatus.Pending,
      userId,
      courseId,
    };
    await UserCourse.create(userCourseToAdd);
    return res.status(CREATED).send();
  } catch (err) {
    return next(new HttpError(CONFLICT, errorMessages.UNIQUE_USER_COURSE));
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

export { fetchApproved, fetchPending, fetchByCourseId, apply, updateStatus };
