import { Request, Response } from 'express';
import EventDanceModel from './eventDance.model';

const test = async (req: Request, res: Response) => {
  const trainerApplications = await EventDanceModel.findAll();
  return res.send(trainerApplications);
};

export { test };
