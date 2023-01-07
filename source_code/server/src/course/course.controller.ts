import { BAD_REQUEST, OK } from 'http-status';
import { NextFunction, Request, Response } from 'express';
import { Course } from 'shared/database';
import errorMessages from 'shared/constants/errorMessages';
import HttpError from 'shared/error/httpError';

const fetchAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courses = await Course.scope(['includeClub', 'includeDance', 'includeLocation']).findAll();
    return res.status(OK).json(courses);
  } catch (err) {
    return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
  }
};

const fetchById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courseId = JSON.parse(req.params.id);
    const course = await Course.scope(['includeClub', 'includeDance', 'includeLocation', 'includeTrainer']).findByPk(
      courseId,
    );
    return res.status(OK).json(course);
  } catch (err) {
    return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
  }
};

export { fetchAll, fetchById };
