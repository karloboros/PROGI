import { BAD_REQUEST, CONFLICT, CREATED, FORBIDDEN, OK } from 'http-status';
import { NextFunction, Request, Response } from 'express';
import sequelize, { Course, Lesson, Location } from 'shared/database';
import errorMessages from 'shared/constants/errorMessages';
import HttpError from 'shared/error/httpError';
import { UniqueConstraintError } from 'sequelize';

const test = async (req: Request, res: Response) => {
  const lessons = await Lesson.findAll();
  return res.send(lessons);
};
const fetchAll = async (req: Request, res: Response) => {
  const { courseId } = JSON.parse(req.params.courseId);
  const lessons = await Course.findByPk(courseId, { include: [Lesson, Location] });
  return res.send(lessons);
};
const create = async (req: Request, res: Response, next: NextFunction) => {
  const transaction = await sequelize.transaction();
  try {
    const { course } = JSON.parse(req.params.courseId);
    console.log(course);
    const newLesson = {
      ...req.body,
      courseId: course,
    };
    console.log(newLesson);
    const lesson = await Lesson.create(newLesson, { transaction });
    await transaction.commit();
    return res.status(OK).json(lesson);
  } catch (err) {
    await transaction.rollback();

    if (err instanceof UniqueConstraintError) {
      return next(new HttpError(CONFLICT, errorMessages.LESSON_CREATE));
    }
    return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
  }
};
const edit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lesson = req.body;
    const { lessonId } = JSON.parse(req.params.id);
    const lessonToEdit = await Lesson.findByPk(lessonId);
    if (!lessonToEdit) return next(new HttpError(FORBIDDEN, errorMessages.FORBIDDEN));

    lessonToEdit.startTime = lesson.startTime;
    lessonToEdit.endTime = lesson.endTime;
    // mogu li se uređivati svi ti parameti ili ipak ne?

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
  const { lessonId } = JSON.parse(req.params.id);
  try {
    // edit with scope
    const lessonToRemove = await Lesson.findByPk(lessonId);
    if (!lessonToRemove) return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
    await lessonToRemove.destroy();
    res.status(OK).send();
  } catch (err) {
    return next(err);
  }
};

export { test, create, edit, remove, fetchAll };
