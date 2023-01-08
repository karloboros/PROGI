import { EventDance } from 'shared/database';
// eslint-disable-next-line sort-imports
import { Request, Response } from 'express';

const eventDance = async (req: Request, res: Response) => {
  const eventDances = await EventDance.scope(['includeEventDance']).findAll();
  return res.send(eventDances);
};

export { eventDance };
