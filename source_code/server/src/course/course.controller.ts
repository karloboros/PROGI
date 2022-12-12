import { Request, Response } from 'express';
import { Course } from 'shared/database';

const test = async (req: Request, res: Response) => {
  const courses = await Course.findAll();
  return res.send(courses);
};

export { test };
