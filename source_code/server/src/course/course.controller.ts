import { BAD_REQUEST, CONFLICT, CREATED, FORBIDDEN, OK } from 'http-status';
import { NextFunction, Request, Response } from 'express';
import sequelize, { Course, Location } from 'shared/database';
import errorMessages from 'shared/constants/errorMessages';
import HttpError from 'shared/error/httpError';
import { UniqueConstraintError } from 'sequelize';

const test = async (req: Request, res: Response) => {
  const courses = await Course.findAll();
  return res.send(courses);
};

const fetchByClub = async (req: Request, res: Response) => {
  const club = req.params.clubId;
  const courses = await Course.findAll({
    where: {
      clubId: club,
    },
  });
  console.log(courses);
  return res.send(courses);
};

const fetchAll = async (req: Request, res: Response) => {
  const courses = await Course.findAll();
  return res.send(courses);
};

const fetchById = async (req: Request, res: Response) => {
  const course = await Course.findByPk(req.params.id);
  return res.send(course);
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  const transaction = await sequelize.transaction();
  try {
    const { club } = JSON.parse(req.params.clubId);
    const { dance, address, trainer } = req.body;
    const location = await Location.create({ name: address }, { transaction });

    const newCourse = {
      ...req.body,
      clubId: club,
      danceId: dance,
      locationId: location.id,
      trainerId: trainer,
    };
    const course = await Course.create(newCourse, { transaction });
    await transaction.commit();
    return res.status(OK).json(course);
  } catch (err) {
    await transaction.rollback();

    if (err instanceof UniqueConstraintError) {
      return next(new HttpError(CONFLICT, errorMessages.COURSE_CREATE));
    }
    return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
  }
};

const edit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const course = { ...req.body };
    const courseId = JSON.parse(req.params.id);
    const courseToEdit = await Course.findByPk(courseId);
    if (!courseToEdit) return next(new HttpError(FORBIDDEN, errorMessages.FORBIDDEN));

    courseToEdit.name = course.name;
    courseToEdit.description = course.description;
    courseToEdit.capacity = course.capacity;
    courseToEdit.minAge = course.minAge;
    courseToEdit.maxAge = course.maxAge;
    courseToEdit.gender = course.gender;
    courseToEdit.applicationDeadline = course.applicationDeadline;
    courseToEdit.additionalRules = course.additionalRules;
    courseToEdit.danceId = course.danceId;
    courseToEdit.locationId = course.locationId;
    courseToEdit.trainerId = course.trainerId;

    // mogu li se uređivati svi ti parameti ili ipak ne?

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
  const { course } = JSON.parse(req.params.id);
  try {
    // edit with scope
    const courseToRemove = await Course.scope('includeLesson').findByPk(course);
    if (!courseToRemove) return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
    if (courseToRemove.lessons?.length) return next(new HttpError(CONFLICT, errorMessages.COURSE_DELETE));

    await courseToRemove.destroy();
    res.status(OK).send();
  } catch (err) {
    return next(err);
  }
};

export { test, create, edit, remove, fetchAll, fetchById, fetchByClub };
