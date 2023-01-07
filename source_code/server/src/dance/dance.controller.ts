import { Dance, Event } from 'shared/database';
import { Request, Response } from 'express';
import model from 'sequelize/types/model';

const test = async (req: Request, res: Response) => {
  const dances = await Dance.findAll({
    include: {
      model: Event,
    },
  });
  return res.send(dances);
};

export { test };
