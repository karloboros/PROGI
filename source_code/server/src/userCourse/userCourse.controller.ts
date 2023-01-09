import { BAD_REQUEST, CREATED, FORBIDDEN, NOT_FOUND, OK } from 'http-status';
import { Club, User, UserCourse } from 'shared/database';
import { NextFunction, Request, Response } from 'express';
import { ApprovalStatus } from 'club/types';
import errorMessages from 'shared/constants/errorMessages';
import HttpError from 'shared/error/httpError';
import { Role } from 'user/types';

const apply = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req;
    const foundUser = await User.findOne({ where: { id: user.id } });
    if (!foundUser) return next(new HttpError(NOT_FOUND, errorMessages.NOT_FOUND));
    if (foundUser.role !== Role.User) return next(new HttpError(FORBIDDEN, errorMessages.FORBIDDEN));

    const { courseId } = req.params;
    const application = {
      status: ApprovalStatus.Pending,
      userId: user.id,
      courseId,
    };
    UserCourse.create(application);
    return res.status(CREATED).send('Application sent successfully!');
  } catch {
    return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
  }
};

const updateStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const owner = req.user;
    const { id, isApproved } = req.body;
    const userCourse = await UserCourse.scope('includeCourse').findByPk(id);
    if (!userCourse) return next(new HttpError(NOT_FOUND, errorMessages.NOT_FOUND));

    const club = await Club.findByPk(userCourse.course?.clubId);
    if (!club) return next(new HttpError(NOT_FOUND, errorMessages.NOT_FOUND));
    if (club.ownerId !== owner.id) return next(new HttpError(FORBIDDEN, errorMessages.FORBIDDEN));
    userCourse.status = isApproved ? ApprovalStatus.Approved : ApprovalStatus.Rejected;
    await userCourse.save();

    return res.status(OK).send('Application status changed successfully!');
  } catch {
    return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
  }
};

const getApproved = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { courseId } = req.params;
    const userCourses = await UserCourse.scope(['accepted', 'includeUser']).findAll({ where: { courseId } });
    return res.status(OK).send(userCourses);
  } catch {
    return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
  }
};

const getPending = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { courseId } = req.params;
    const userCourses = await UserCourse.scope(['pending', 'includeUser']).findAll({ where: { courseId } });
    return res.status(OK).send(userCourses);
  } catch {
    return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
  }
};

const getByUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const applications = await UserCourse.scope('includeCourse').findAll({ where: { userId } });
    return res.status(OK).send(applications);
  } catch {
    return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
  }
};

export { apply, updateStatus, getApproved, getPending, getByUser };
