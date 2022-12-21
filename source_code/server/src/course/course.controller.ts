import { BAD_REQUEST, CONFLICT, CREATED, FORBIDDEN, OK, UNAUTHORIZED } from 'http-status';
import { clearAuthCookies, setAuthCookies } from 'shared/helpers/tokens';
import { NextFunction, Request, Response } from 'express';
import { Course } from 'shared/database';
import errorMessages from 'shared/constants/errorMessages';
import HttpError from 'shared/error/httpError';
import { UniqueConstraintError } from 'sequelize';

const test = async (req: Request, res: Response) => {
  const courses = await Course.findAll();
  return res.send(courses);
};

const edit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const course = req.body;
    const courseToEdit = await Course.findByPk(course.id);
    if (!courseToEdit) return next(new HttpError(FORBIDDEN, errorMessages.FORBIDDEN));

    courseToEdit.name = course.name;
    courseToEdit.description = course.description;
    courseToEdit.capacity = course.capacity;
    courseToEdit.minAge = course.minAge;
    courseToEdit.maxAge = course.maxAge;
    courseToEdit.gender = course.gender;
    courseToEdit.applicationDeadline = course.applicationDeadline;
    courseToEdit.additionalRules = course.additionalRules;

    await courseToEdit.save();
    return res.status(CREATED).json({ ...courseToEdit });
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      return next(new HttpError(CONFLICT, errorMessages.UNIQUE));
    }
    return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  const { course } = req;
  try {
    //edit with scope
    const courseToRemove = await Course.scope('includeClub').findByPk(course.id);
    if (!courseToRemove) return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
    // edit this if (courseToRemove.club?.length) return next(new HttpError(CONFLICT, errorMessages.CLUB_OWNER_DELETE));

    await courseToRemove.destroy();
    res.status(OK).send();
  } catch (err) {
    return next(err);
  }
};

export { test };
