import { BAD_REQUEST, CONFLICT, OK } from 'http-status';
import { NextFunction, Request, Response } from 'express';
import sequelize, { Club, Dance, Event, EventDance, Location } from 'shared/database';
import errorMessages from 'shared/constants/errorMessages';
import HttpError from 'shared/error/httpError';

const create = async (req: Request, res: Response, next: NextFunction) => {
  const transaction = await sequelize.transaction();
  try {

    const { name, description, image, address, dances } = req.body;
    const clubName = req.body.club;

    const club = await Club.findOne({ where: { name: clubName} });
    if (!club) return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));

    let location = await Location.findOne({ where: { name: address } });
    if (!location) location = await Location.create({ name: address }, { transaction });

    const newEvent = {
      name: name,
      description: description,
      image: image,
      locationId: location.id,
      clubId: club.id,
    };
    const event = await Event.create(newEvent, { transaction });
    
  
    if (!dances) return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));

    const eventDances = dances.map((d: number) => ({
      danceId: d,
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
export { create, uploadEventImage };
