import { BAD_REQUEST, CONFLICT, CREATED, FORBIDDEN, OK } from 'http-status';
import { NextFunction, Request, Response } from 'express';
import sequelize, { Lesson } from 'shared/database';
import errorMessages from 'shared/constants/errorMessages';
import HttpError from 'shared/error/httpError';
import { UniqueConstraintError } from 'sequelize';

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newLesson = {
      ...req.body,
    };
    const lesson = await Lesson.create(newLesson);
    return res.status(OK).json(lesson);
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      return next(new HttpError(CONFLICT, errorMessages.LESSON_CREATE));
    }
    return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
  }
};
const edit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lesson = { ...req.body };
    const { id } = req.params;
    const lessonToEdit = await Lesson.findByPk(id);
    if (!lessonToEdit) return next(new HttpError(FORBIDDEN, errorMessages.FORBIDDEN));

    lessonToEdit.startTime = lesson.startTime;
    lessonToEdit.endTime = lesson.endTime;

    await lessonToEdit.save();
    return res.status(CREATED).json({ ...lessonToEdit });
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      return next(new HttpError(CONFLICT, errorMessages.UNIQUE));
    }
    return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
  }
};
const remove = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const lessonToRemove = await Lesson.findByPk(id);
    if (!lessonToRemove) return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
    await lessonToRemove.destroy();
    res.status(OK).send();
  } catch (err) {
    return next(err);
  }
};

export { create, edit, remove };
