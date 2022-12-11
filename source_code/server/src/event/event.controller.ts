import { Request, Response } from 'express';
import EventModel from './event.model';

const test = async (req: Request, res: Response) => {
  const trainerApplications = await EventModel.findAll();
  return res.send(trainerApplications);
};

export { test };
