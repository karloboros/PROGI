import { BAD_REQUEST, CONFLICT, CREATED, NOT_FOUND, OK } from 'http-status';
import { Dance, Event, EventDance } from 'shared/database';
import { NextFunction, Request, Response } from 'express';
import errorMessages from 'shared/constants/errorMessages';
import HttpError from 'shared/error/httpError';
import { UniqueConstraintError } from 'sequelize';

const fetchAll = async (_req: Request, res: Response) => {
  const dances = await Dance.findAll();
  return res.send(dances);
};

const fetchById = async (req: Request, res: Response) => {
  const dance = await Dance.findByPk(+req.params.id);
  return res.send(dance);
};

const fetchDanceEvent = async (req: Request, res: Response) => {
  const events = await Dance.findAll({ include: [Event] });
  return res.send(events);
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newDance = { ...req.body };
    const dance = await Dance.create(newDance);
    return res.status(OK).json(dance);
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      return next(new HttpError(CONFLICT, errorMessages.UNIQUE));
    }
    return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
  }
};

const edit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, name, description, videoUrl, image } = req.body;

    const danceToEdit = await Dance.findByPk(id);
    if (!danceToEdit) return next(new HttpError(NOT_FOUND, errorMessages.NOT_FOUND));

    danceToEdit.name = name;
    danceToEdit.description = description;
    danceToEdit.videoUrl = videoUrl;
    danceToEdit.image = image;

    await danceToEdit.save();
    return res.status(CREATED).json(danceToEdit);
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      return next(new HttpError(CONFLICT, errorMessages.UNIQUE));
    }
    return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const danceId = JSON.parse(req.params.id);

    const events = await EventDance.findOne({ where: { danceId } });
    if (events) return next(new HttpError(CONFLICT, errorMessages.EVENT_DANCE_DELETE));

    const danceToRemove = await Dance.findByPk(danceId);
    if (!danceToRemove) return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));

    await danceToRemove.destroy();
    res.status(OK).send();
  } catch (err) {
    return next(err);
  }
};

const uploadDanceImage = (req: Request, res: Response, next: NextFunction) => {
  const { file } = req;
  if (!file) return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));

  return res.status(OK).json({ path: `/images/dances/${file.filename}` });
};

export { create, edit, fetchAll, fetchById, fetchDanceEvent, remove, uploadDanceImage };
