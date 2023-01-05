import { Request, Response } from 'express';
import { TrainerApplication } from 'shared/database';

const test = async (req: Request, res: Response) => {
  const trainerApplications = await TrainerApplication.findAll({ include: 'trainer' });
  return res.send(trainerApplications);
};

const fetchApproved = async (req: Request, res: Response) => {
  const approved = await TrainerApplication.scope(['approved', 'includeTrainer']).findAll();
  console.log(approved);
  return res.send(approved);
};

export { test, fetchApproved };
