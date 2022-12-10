import { Request, Response } from 'express';
import CourseModel from './course.model';

const test = async (req: Request, res: Response) => {
  const courses = await CourseModel.findAll();
  return res.send(courses);
};

export { test };
