import { Request, Response } from 'express';
import TrainerApplicationModel from './trainerApplication.model';

const test = async (req: Request, res: Response) => {
  const trainerApplications = await TrainerApplicationModel.findAll();
  return res.send(trainerApplications);
};

export { test };
