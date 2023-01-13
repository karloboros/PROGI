import { BAD_REQUEST, CONFLICT, CREATED, FORBIDDEN, OK } from 'http-status';
import { NextFunction, Request, Response } from 'express';
import sequelize, { Course, Dance, Location, User } from 'shared/database';
import errorMessages from 'shared/constants/errorMessages';
import HttpError from 'shared/error/httpError';
import { Role } from 'user/types';
import { UniqueConstraintError } from 'sequelize';

const fetchActive = async (_req: Request, res: Response) => {
  const courses = await Course.scope(['includeLocation', 'includeLessons']).findAll();
  const activeCourses = courses.filter(course => course.isActive);
  return res.status(OK).json(activeCourses);
};

const fetchById = async (req: Request, res: Response) => {
  const course = await Course.scope([
    'includeLocation',
    'includeTrainer',
    'includeClub',
    'includeDance',
    'includeLessons',
  ]).findByPk(+req.params.id);

  if (req.user.role === Role.Trainer && course?.isTrainerActive) return res.status(OK).json(course);
  else if (!course?.isActive) return res.status(OK).json(null);
  return res.status(OK).json(course);
};

const fetchByClub = async (req: Request, res: Response) => {
  const club = req.params.clubId;
  const courses = await Course.findAll({
    where: {
      clubId: club,
    },
  });
  return res.status(OK).json(courses);
};

const fetchByTrainerId = async (req: Request, res: Response) => {
  const trainerId = req.params.trainerId;
  const courses = (await Course.scope(['includeLessons', 'includeLocation']).findAll({ where: { trainerId } })).filter(
    course => course.isTrainerActive,
  );
  return res.send(courses);
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  const transaction = await sequelize.transaction();
  try {
    const data = {
      ...req.body,
    };
    const dance = await Dance.findOne({ where: { id: data.dance } });
    if (!dance) return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));

    const trainer = await User.scope(['trainers']).findOne({
      where: { id: data.trainer },
    });
    if (!trainer) return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));

    let location = await Location.findOne({ where: { name: data.address } });
    if (!location)
      location = await Location.create({ name: data.address, coordinates: data.coordinates }, { transaction });

    const newCourse = {
      ...req.body,
      danceId: dance.id,
      locationId: location.id,
      trainerId: trainer.id,
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
    const { id } = req.params;
    const courseToEdit = await Course.findByPk(id);
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
  try {
    const { id } = req.params;
    const courseToRemove = await Course.scope('includeLessons').findByPk(id);
    if (!courseToRemove) return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
    if (courseToRemove.lessons?.length) return next(new HttpError(CONFLICT, errorMessages.COURSE_DELETE));

    await courseToRemove.destroy();
    res.status(OK).send();
  } catch (err) {
    return next(err);
  }
};

export { fetchActive, fetchById, fetchByClub, fetchByTrainerId, create, edit, remove };
