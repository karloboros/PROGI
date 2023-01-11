import { BAD_REQUEST, CONFLICT, NOT_FOUND, OK } from 'http-status';
import { NextFunction, Request, Response } from 'express';
import sequelize, { Club, Course, Location, TrainerApplication, User } from 'shared/database';
import { ApprovalStatus } from './types';
import errorMessages from 'shared/constants/errorMessages';
import HttpError from 'shared/error/httpError';
import { Role } from 'user/types';
import { UniqueConstraintError } from 'sequelize';

const fetchAll = async (_req: Request, res: Response) => {
  const clubs = await Club.scope(['includeLocation', 'includeOwner']).findAll();
  return res.status(OK).json(clubs);
};

const fetchById = async (req: Request, res: Response) => {
  const club = await Club.scope(['includeLocation', 'includeOwner']).findByPk(+req.params.id);
  return res.status(OK).json(club);
};

const fetchWithDances = async (_req: Request, res: Response) => {
  const clubs = await Club.scope(['includeCourseEventLocation']).findAll();
  const clubsWithDances = clubs.map(({ id, name, description, location, events, courses }) => {
    const danceIds: number[] = [];
    courses?.forEach(({ danceId }) => danceIds.indexOf(danceId) === -1 && danceIds.push(danceId));
    events?.forEach(({ dances }) => {
      dances?.forEach(({ id: danceId }) => danceIds.indexOf(danceId) === -1 && danceIds.push(danceId));
    });
    return { id, name, description, location, danceIds };
  });
  return res.status(OK).json(clubsWithDances);
};

const fetchApproved = async (_req: Request, res: Response) => {
  const clubs = await Club.scope(['approved', 'includeOwner']).findAll();
  return res.status(OK).json(clubs);
};

const fetchPending = async (_req: Request, res: Response) => {
  const pendingClubs = await Club.scope(['pending', 'includeOwner', 'includeLocation']).findAll();
  return res.status(OK).json(pendingClubs);
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  const transaction = await sequelize.transaction();
  try {
    const { address } = req.body;

    let location = await Location.findOne({ where: { name: address } });
    if (!location) location = await Location.create({ name: address }, { transaction });

    const newClub = {
      ...req.body,
      approvalStatus: ApprovalStatus.Pending,
      ownerId: req.user.id,
      locationId: location.id,
    };
    const club = await Club.create(newClub, { transaction });
    const user = await User.findByPk(req.user.id);
    if (!user) return next(new HttpError(NOT_FOUND, errorMessages.NOT_FOUND));
    user.role = Role.ClubOwner;
    user.save();

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
    const { id, name, description, address, email, phone } = req.body;

    const clubToEdit = await Club.findByPk(id);
    if (!clubToEdit) return next(new HttpError(NOT_FOUND, errorMessages.NOT_FOUND));

    let location = await Location.findOne({ where: { name: address } });
    if (!location) location = await Location.create({ name: address });

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

  try {
    club.approvalStatus = approvalStatus;
    club.save();

    return res.sendStatus(OK);
  } catch {
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
  fetchById,
  fetchWithDances,
  fetchApproved,
  fetchPending,
  create,
  edit,
  updateApprovalStatus,
  remove,
};
