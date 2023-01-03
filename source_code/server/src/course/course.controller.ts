import { Course, Dance, Location } from 'shared/database';
import { Request, Response } from 'express';

const fetchCoursesLocations = async (req: Request, res: Response) => {
  const courses = await Course.findAll({
    include: Location,
  });
  return res.send(courses);
};

const test = async (req: Request, res: Response) => {
  const courses = await Course.findAll();
  return res.send(courses);
};

export { fetchCoursesLocations, test };
