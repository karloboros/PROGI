import { Club, Dance, Event, EventDance, Location } from 'shared/database';
import { Request, Response } from 'express';

const fetchEventLocation = async (req: Request, res: Response) => {
  const events = await Event.scope(['includeEventDances']).findAll({
    include: [{ model: Club }, { model: Location }],
  });
  return res.send(events);
};
/*
const fetchEventDance = async (req: Request, res: Response) => {
  const events = await Event.findAll({
    include: [
      {
        model: 'eventDance',
        include: [{ model: Dance }],
      },
    ],
  });
  return res.send(events);
};
*/

const fetchEventDance = async (req: Request, res: Response) => {
  const events = await Event.findAll({
    include: [
      {
        model: Dance,
        through: { attributes: ['danceId'] },
      },
    ],
  });
  return res.send(events);
};

/*
const fetchEventDance = async (req: Request, res: Response) => {
  const eventDances = await EventDance.scope(['eventDance']).findAll();
  return res.send(eventDances);
};
*/
export { fetchEventDance, fetchEventLocation };
