import { BAD_REQUEST, CONFLICT, CREATED, NOT_FOUND, OK } from 'http-status';
import { NextFunction, Request, Response } from 'express';
import sequelize, { Club, Event, EventDance, Location } from 'shared/database';
import errorMessages from 'shared/constants/errorMessages';
import HttpError from 'shared/error/httpError';
import { UniqueConstraintError } from 'sequelize';

const fetchAll = async (_req: Request, res: Response) => {
  const events = await Event.scope(['includeAll']).findAll();
  return res.status(OK).json(events);
};

const fetchById = async (req: Request, res: Response) => {
  const event = await Event.scope(['includeAll']).findByPk(+req.params.id);
  return res.status(OK).json(event);
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  const transaction = await sequelize.transaction();
  try {
    const { name, description, image, startTime, clubName, locationName, coordinates, dances } = req.body;

    if (!dances) return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));

    const club = await Club.findOne({ where: { name: clubName } });
    if (!club) return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));

    let location = await Location.findOne({ where: { name: locationName } });
    if (!location) location = await Location.create({ name: locationName, coordinates }, { transaction });

    const newEvent = {
      name,
      description,
      image,
      startTime,
      locationId: location.id,
      clubId: club.id,
    };
    const event = await Event.create(newEvent, { transaction });

    const eventDances = dances.map((danceId: number) => ({
      danceId,
      eventId: event.id,
    }));

    await EventDance.bulkCreate(eventDances, { transaction });
    await transaction.commit();
    return res.status(OK).json(event);
  } catch (err) {
    await transaction.rollback();
    return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
  }
};

const edit = async (req: Request, res: Response, next: NextFunction) => {
  const transaction = await sequelize.transaction();
  try {
    const { id, name, description, startTime, image, clubName, locationName, coordinates } = req.body;

    const eventToEdit = await Event.findByPk(id);
    if (!eventToEdit) return next(new HttpError(NOT_FOUND, errorMessages.NOT_FOUND));

    const club = await Club.findOne({ where: { name: clubName } });
    if (!club) return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));

    let location = await Location.findOne({ where: { name: locationName } });
    if (!location) location = await Location.create({ name: locationName, coordinates }, { transaction });

    eventToEdit.name = name;
    eventToEdit.description = description;
    eventToEdit.startTime = startTime;
    eventToEdit.image = image;
    eventToEdit.clubId = club.id;
    eventToEdit.locationId = location.id;

    await eventToEdit.save({ transaction });
    await transaction.commit();
    return res.status(CREATED).json(eventToEdit);
  } catch (err) {
    await transaction.rollback();
    if (err instanceof UniqueConstraintError) {
      return next(new HttpError(CONFLICT, errorMessages.UNIQUE));
    }
    return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  const transaction = await sequelize.transaction();
  try {
    const eventId = JSON.parse(req.params.id);

    const eventDances = await EventDance.findAll({ where: { eventId } });
    if (eventDances) await EventDance.destroy({ where: { eventId }, transaction });

    const eventToRemove = await Event.findByPk(eventId);
    if (!eventToRemove) return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));

    await eventToRemove.destroy({ transaction });
    await transaction.commit();
    res.status(OK).send();
  } catch (err) {
    await transaction.rollback();
    return next(err);
  }
};

const uploadEventImage = (req: Request, res: Response, next: NextFunction) => {
  const { file } = req;
  if (!file) return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));

  return res.status(OK).json({ path: `/images/events/${file.filename}` });
};

export { fetchAll, fetchById, create, edit, remove, uploadEventImage };
