import { Request, Response } from 'express';
import { Event } from 'shared/database';

const test = async (req: Request, res: Response) => {
  const events = await Event.findAll();
  return res.send(events);
};

export { test };
