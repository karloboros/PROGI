import { BAD_REQUEST, CONFLICT, OK } from 'http-status';
import { NextFunction, Request, Response } from 'express';
import sequelize, { Club, Dance, Event, EventDance, Location } from 'shared/database';
import errorMessages from 'shared/constants/errorMessages';
import HttpError from 'shared/error/httpError';
import { UniqueConstraintError } from 'sequelize';

const test = async (req: Request, res: Response) => {
  const events = await Event.findAll();
  return res.send(events);
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  const transaction = await sequelize.transaction();
  const transaction2 = await sequelize.transaction();
  try {
    const data = {
      ...req.body,
    };
    const club = await Club.findOne({ where: { name: data.club } });
    if (!club) return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));

    let location = await Location.findOne({ where: { name: data.address } });
    if (!location) location = await Location.create({ name: data.address }, { transaction });

    const newEvent = {
      ...req.body,
      locationId: location.id,
      clubId: club.id,
    };
    const event = await Event.create(newEvent, { transaction });
    await transaction.commit();

    const dance = await Dance.findOne({ where: { name: data.dance } });
    if (!dance) return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
    const newEventDance = {
      danceId: dance.id,
      eventId: event.id,
    };
    await EventDance.create(newEventDance, { transaction: transaction2 });
    await transaction2.commit();

    return res.status(OK).json(event);
  } catch (err) {
    await transaction.rollback();
    await transaction2.rollback();

    if (err instanceof UniqueConstraintError) {
      return next(new HttpError(CONFLICT, errorMessages.REGISTER));
    }
    return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
  }
};

const uploadEventImage = (req: Request, res: Response, next: NextFunction) => {
  const { file } = req;
  if (!file) return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));

  return res.status(OK).json({ path: `/images/events/${file.filename}` });
};
export { test, create, uploadEventImage };
