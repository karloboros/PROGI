import { BAD_REQUEST, CONFLICT, CREATED, FORBIDDEN, OK } from 'http-status';
import { NextFunction, Request, Response } from 'express';
import sequelize, { Dance } from 'shared/database';
import errorMessages from 'shared/constants/errorMessages';
import HttpError from 'shared/error/httpError';
import { UniqueConstraintError } from 'sequelize';

const fetchAll = async (req: Request, res: Response) => {
  const dances = await Dance.findAll();
  return res.send(dances);
};

const fetchById = async (req: Request, res: Response) => {
  const dance = await Dance.findByPk(req.params.id);
  return res.send(dance);
};

const edit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dance = req.body;
    console.log(req.body);
    const danceToEdit = await Dance.findOne({ where: { id: req.params.id } });
    if (!danceToEdit) return next(new HttpError(FORBIDDEN, errorMessages.FORBIDDEN));

    danceToEdit.name = dance.name;
    danceToEdit.description = dance.description;
    danceToEdit.videoUrl = dance.videoUrl;
    danceToEdit.image = dance.image;

    await danceToEdit.save();
    return res.status(CREATED).json({ ...danceToEdit.profile });
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      return next(new HttpError(CONFLICT, errorMessages.UNIQUE));
    }
    return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  const transaction = await sequelize.transaction();
  try {
    const newDance = {
      ...req.body,
    };
    const dance = await Dance.create(newDance, { transaction });
    await transaction.commit();
    return res.status(OK).json(dance);
  } catch (err) {
    await transaction.rollback();

    if (err instanceof UniqueConstraintError) {
      return next(new HttpError(CONFLICT, errorMessages.REGISTER));
    }
    return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const danceToRemove = await Dance.scope('includeEvent').findOne({ where: { id: req.params.id } });
    if (!danceToRemove) return next(new HttpError(BAD_REQUEST, errorMessages.BAD_REQUEST));
    if (danceToRemove.events?.length) return next(new HttpError(CONFLICT, errorMessages.EVENT_DANCE_DELETE));
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

export { edit, fetchAll, create, remove, uploadDanceImage, fetchById };
