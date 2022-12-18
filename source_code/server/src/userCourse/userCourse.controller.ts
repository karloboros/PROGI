import { Request, Response } from 'express';
import { UserCourse } from 'shared/database';

const test1 = async (req: Request, res: Response) => {
  const userCourses = await UserCourse.findAll({ include: 'user' });
  return res.send(userCourses);
};
const test2 = async (req: Request, res: Response) => {
  const userCourses = await UserCourse.findAll({ include: 'course' });
  return res.send(userCourses);
};

export { test1, test2 };
