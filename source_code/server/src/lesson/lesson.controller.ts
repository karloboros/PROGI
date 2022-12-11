import { Request, Response } from 'express';
import { Lesson } from 'shared/database';

const test = async (req: Request, res: Response) => {
  const lessons = await Lesson.findAll();
  return res.send(lessons);
};

export { test };
