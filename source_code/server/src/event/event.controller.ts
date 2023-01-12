import { BAD_REQUEST, OK } from 'http-status';
import { NextFunction, Request, Response } from 'express';
import sequelize, { Club, Event, EventDance, Location } from 'shared/database';
import errorMessages from 'shared/constants/errorMessages';
import HttpError from 'shared/error/httpError';

const fetchAll = async (_req: Request, res: Response) => {
  const events = await Event.scope('includeAll').findAll();
  return res.status(OK).json(events);
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  const transaction = await sequelize.transaction();
  try {
    const { name, description, image, startTime, clubName, address, dances } = req.body;

    if (!dances) return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));

    const club = await Club.findOne({ where: { name: clubName } });
    if (!club) return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));

    let location = await Location.findOne({ where: { name: address } });
    if (!location) location = await Location.create({ name: address }, { transaction });

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

const uploadEventImage = (req: Request, res: Response, next: NextFunction) => {
  const { file } = req;
  if (!file) return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));

  return res.status(OK).json({ path: `/images/events/${file.filename}` });
};

export { fetchAll, create, uploadEventImage };
