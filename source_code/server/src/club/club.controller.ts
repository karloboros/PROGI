import { BAD_REQUEST, CONFLICT, FORBIDDEN, NOT_FOUND, OK } from 'http-status';
import { NextFunction, Request, Response } from 'express';
import sequelize, { Club, Course, Event, Location, TrainerApplication, User } from 'shared/database';
import { ApprovalStatus } from './types';
import errorMessages from 'shared/constants/errorMessages';
import HttpError from 'shared/error/httpError';
import { Role } from 'user/types';
import { UniqueConstraintError } from 'sequelize';

const fetchAll = async (_req: Request, res: Response) => {
  const clubs = await Club.scope(['includeLocation', 'includeOwner']).findAll();
  return res.status(OK).json(clubs);
};

const fetchWithDances = async (_req: Request, res: Response) => {
  const clubs = await Club.scope([
    'includeCourses',
    'includeEventsWithDances',
    'includeLocation',
    'approved',
  ]).findAll();
  const clubsWithDances = clubs.map(club => {
    const danceIds = club.getDanceIds();
    const { id, name, description, location } = club;
    return { id, name, description, location, danceIds };
  });
  return res.status(OK).json(clubsWithDances);
};

const fetchByIdWithDances = async (req: Request, res: Response, next: NextFunction) => {
  const club = await Club.scope([
    'includeOwner',
    'includeCoursesWithDances',
    'includeEventsWithDances',
    'includeLocation',
  ]).findByPk(+req.params.id);
  if (!club) return next(new HttpError(NOT_FOUND, errorMessages.NOT_FOUND));
  const dances = club?.getDanceNames();
  return res.status(OK).json({ ...club.get({ plain: true }), dances });
};

const fetchApproved = async (_req: Request, res: Response) => {
  const clubs = await Club.scope(['approved', 'includeOwner']).findAll();
  return res.status(OK).json(clubs);
};

const fetchPending = async (_req: Request, res: Response) => {
  const pendingClubs = await Club.scope(['pending', 'includeOwner', 'includeLocation']).findAll();
  return res.status(OK).json(pendingClubs);
};

const fetchTrainersByClubId = async (req: Request, res: Response) => {
  const { clubId } = req.params;
  const trainerApplications = await TrainerApplication.scope(['includeTrainer']).findAll({
    where: { clubId, status: ApprovalStatus.Approved },
  });
  const trainers = trainerApplications.map(({ trainer }) => trainer);
  const fileredTrainers = trainers.filter((value, index, self) => self.indexOf(value) === index);
  return res.status(OK).json(fileredTrainers);
};

const fetchByOwner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ownerId = req.user.id;
    const club = await Club.scope(['includeLocation']).findOne({ where: { ownerId } });
    return res.status(OK).json(club);
  } catch (err) {
    return next(new HttpError(FORBIDDEN, errorMessages.FORBIDDEN));
  }
};

const fetchById = async (req: Request, res: Response) => {
  const club = await Club.scope(['includeLocation', 'includeOwner']).findByPk(+req.params.id);
  return res.status(OK).json(club);
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  const transaction = await sequelize.transaction();
  try {
    const { locationName, coordinates } = req.body;

    let location = await Location.findOne({ where: { name: locationName } });
    if (!location) location = await Location.create({ name: locationName, coordinates }, { transaction });

    const newClub = {
      ...req.body,
      approvalStatus: ApprovalStatus.Pending,
      ownerId: req.user.id,
      locationId: location.id,
    };
    const club = await Club.create(newClub, { transaction });
    await transaction.commit();
    return res.status(OK).json(club);
  } catch (err) {
    await transaction.rollback();

    if (err instanceof UniqueConstraintError) {
      return next(new HttpError(CONFLICT, errorMessages.REGISTER));
    }
    return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
  }
};

const edit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, name, description, locationName, coordinates, email, phone } = req.body;

    const clubToEdit = await Club.findByPk(id);
    if (!clubToEdit) return next(new HttpError(NOT_FOUND, errorMessages.NOT_FOUND));

    let location = await Location.findOne({ where: { name: locationName } });
    if (!location) location = await Location.create({ name: locationName, coordinates });

    clubToEdit.name = name;
    clubToEdit.description = description;
    clubToEdit.locationId = location.id;
    clubToEdit.email = email;
    clubToEdit.phone = phone;

    await clubToEdit.save();
    return res.status(OK).json(clubToEdit);
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      return next(new HttpError(CONFLICT, errorMessages.UNIQUE));
    }
    return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
  }
};

const updateApprovalStatus = async (req: Request, res: Response, next: NextFunction) => {
  const { id, approvalStatus } = req.body;
  if (!approvalStatus) return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));

  const club = await Club.findByPk(id);
  if (!club) return next(new HttpError(NOT_FOUND, errorMessages.NOT_FOUND));
  const transaction = await sequelize.transaction();

  try {
    club.approvalStatus = approvalStatus;
    await club.save({ transaction });

    if (approvalStatus === ApprovalStatus.Approved) {
      const user = await User.findByPk(club.ownerId);
      if (!user) return next(new HttpError(NOT_FOUND, errorMessages.NOT_FOUND));
      user.role = Role.ClubOwner;
      await user.save({ transaction });
    }
    await transaction.commit();
    return res.sendStatus(OK);
  } catch {
    await transaction.rollback();
    return next();
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const clubId = JSON.parse(req.params.id);

    const courses = await Course.findOne({ where: { clubId } });
    if (courses) return next(new HttpError(CONFLICT, errorMessages.COURSE_CLUB_DELETE));

    const trainerApplications = await TrainerApplication.findOne({ where: { clubId } });
    if (trainerApplications) return next(new HttpError(CONFLICT, errorMessages.TRAINER_CLUB_DELETE));

    const event = await Event.findOne({ where: { clubId } });
    if (event) return next(new HttpError(CONFLICT, errorMessages.EVENT_CLUB_DELETE));

    const clubToRemove = await Club.findByPk(clubId);
    if (!clubToRemove) return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));

    await clubToRemove.destroy();
    res.status(OK).send();
  } catch (err) {
    return next(err);
  }
};

export {
  fetchAll,
  fetchWithDances,
  fetchByIdWithDances,
  fetchApproved,
  fetchPending,
  fetchTrainersByClubId,
  fetchByOwner,
  fetchById,
  create,
  edit,
  updateApprovalStatus,
  remove,
};
