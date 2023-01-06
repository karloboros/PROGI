import { Club, Event, Location } from 'shared/database';
import { Request, Response } from 'express';

const fetchClubNames = async (req: Request, res: Response) => {
  const pendingClubNames = await Club.findAll({
    attributes: ['id', 'name'],
  });
  return res.send(pendingClubNames);
};

const fetchEventLocation = async (req: Request, res: Response) => {
  const events = await Event.findAll({
    include: [{ model: Club }, { model: Location }],
  });
  return res.send(events);
};

export { fetchClubNames, fetchEventLocation };
