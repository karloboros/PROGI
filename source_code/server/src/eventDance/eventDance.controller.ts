import { Request, Response } from 'express';
import { EventDance } from 'shared/database';

const test = async (req: Request, res: Response) => {
  const eventDances = await EventDance.findAll();
  return res.send(eventDances);
};

export { test };
