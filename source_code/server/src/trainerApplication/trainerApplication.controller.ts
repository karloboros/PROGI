import { Request, Response } from 'express';
import { TrainerApplication } from 'shared/database';

const test = async (req: Request, res: Response) => {
  const trainerApplications = await TrainerApplication.findAll({ include: 'trainer' });
  return res.send(trainerApplications);
};

const fetchApproved = async (req: Request, res: Response) => {
  const trainers = await TrainerApplication.scope(['approved', 'includeTrainer']).findAll();
  console.log(trainers);
  return res.send(trainers);
};

export { test, fetchApproved };
