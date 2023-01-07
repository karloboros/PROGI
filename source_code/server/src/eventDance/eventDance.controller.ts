import { EventDance } from 'shared/database';
// eslint-disable-next-line sort-imports
import { Request, Response } from 'express';

const test = async (req: Request, res: Response) => {
  const testt = await EventDance.findAll();
  return res.send(testt);
};

const eventDance = async (req: Request, res: Response) => {
  const eventDances = await EventDance.scope(['includeEventDance']).findAll();
  return res.send(eventDances);
};

/*
const eventDance = async (req: Request, res: Response) => {
  const eventDances = await EventDance.findAll({
    include: 'includeEventDance',
  });
  return res.send(eventDances);
}; */

export { eventDance, test };
