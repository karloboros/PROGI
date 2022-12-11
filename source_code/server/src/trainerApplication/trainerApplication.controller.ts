import { Request, Response } from 'express';
import { TrainerApplication } from 'shared/database';

const test = async (req: Request, res: Response) => {
  const trainerApplications = await TrainerApplication.findAll({ include: 'trainer' });
  return res.send(trainerApplications);
};

export { test };
