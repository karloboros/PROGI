import { Event, Location } from 'shared/database';
import { Request, Response } from 'express';

const fetchEventLocation = async (req: Request, res: Response) => {
  const events = await Event.findAll({
    include: Location,
  });
  return res.send(events);
};

export { fetchEventLocation };
