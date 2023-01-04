import { Club, Course, Dance, Location, User } from 'shared/database';
import { Request, Response } from 'express';

const fetchCoursesLocations = async (req: Request, res: Response) => {
  const courses = await Course.findAll({
    include: [Location, Dance],
  });
  return res.send(courses);
};

const fetchById = async (req: Request, res: Response) => {
  const courseId = JSON.parse(req.params.id);
  const course = await Course.findByPk(courseId, { include: [Dance, Location, Club] });
  return res.send(course);
};

const test = async (req: Request, res: Response) => {
  const courses = await Course.findAll();
  return res.send(courses);
};

export { fetchCoursesLocations, fetchById, test };
