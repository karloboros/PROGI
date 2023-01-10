import { Request, Response } from 'express';
import { EventDance } from 'shared/database';

const eventDance = async (req: Request, res: Response) => {
  const eventDances = await EventDance.scope(['includeEventDance']).findAll();
  return res.send(eventDances);
};

export { eventDance };
