import { BAD_REQUEST, CONFLICT, CREATED, FORBIDDEN, OK } from 'http-status';
import { NextFunction, Request, Response } from 'express';
import sequelize, { Course, Location } from 'shared/database';
import errorMessages from 'shared/constants/errorMessages';
import HttpError from 'shared/error/httpError';
import { Role } from 'user/types';
import { UniqueConstraintError } from 'sequelize';

const fetchActive = async (req: Request, res: Response) => {
  const courses = await Course.scope(['includeLocation', 'includeLessons']).findAll();
  const activeCourses = courses.filter(course => {
    if (req.user.role === Role.ClubOwner) return course.isActive;
    return course.isApplicationActive;
  });
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

  if ((req.user.role === Role.Trainer || req.user.role === Role.ClubOwner) && course?.isActive)
    return res.status(OK).json(course);
  else if (!course?.isApplicationActive) return res.status(OK).json(null);
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

const fetchByTrainerId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user.role !== Role.Trainer) throw Error();
    const trainerId = req.user.id;
    const courses = await Course.scope(['includeLessons', 'includeLocation']).findAll({ where: { trainerId } });
    const filteredCourses = courses.filter(course => course.isActive);
    return res.status(OK).json(filteredCourses);
  } catch (err) {
    return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  const transaction = await sequelize.transaction();
  try {
    const { locationName, coordinates, danceId, trainerId, minAge, maxAge, ...data } = req.body;
    let location = await Location.findOne({ where: { name: locationName } });
    if (!location) location = await Location.create({ name: locationName, coordinates }, { transaction });
    const newCourse = {
      ...data,
      minAge: minAge || null,
      maxAge: maxAge || null,
      danceId,
      locationId: location.id,
      trainerId,
    };
    await Course.create(newCourse, { transaction });
    await transaction.commit();
    return res.sendStatus(OK);
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
