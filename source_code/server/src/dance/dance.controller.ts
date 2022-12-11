import { Request, Response } from 'express';
import DanceModel from './dance.model';

const test = async (req: Request, res: Response) => {
  const trainerApplications = await DanceModel.findAll();
  return res.send(trainerApplications);
};

export { test };
