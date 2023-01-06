import { Club, Event, Location } from 'shared/database';
import { Request, Response } from 'express';

const fetchEventLocation = async (req: Request, res: Response) => {
  const events = await Event.findAll({
    include: [{ model: Club }, { model: Location }],
  });
  return res.send(events);
};

export { fetchEventLocation };
