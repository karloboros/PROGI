import { Request, Response } from 'express';
import { Dance } from 'shared/database';

const test = async (req: Request, res: Response) => {
  const dances = await Dance.findAll();
  return res.send(dances);
};

export { test };
