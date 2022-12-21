// eslint-disable-next-line sort-imports
import { CREATED } from 'http-status';
// eslint-disable-next-line sort-imports
import { Request, Response } from 'express';
import { UserCourse } from 'shared/database';

const getCandidatesForCourse = async (req: Request, res: Response) => {
  try {
    const candidates = await UserCourse.findAll({ where: { courseId: req.params.courseId } });
    return res.json({ ...candidates });
  } catch {
    return res.status(404);
  }
};
const acceptCandidatesForCourse = async (req: Request, res: Response) => {
  try {
    const candidate = await UserCourse.findOne({ where: { id: req.params.id } });
    if (!candidate) return res.status(404).send('Nema takvog UserCoursea');
    candidate.status = 1;
    await candidate.save();
    return res.send('Kandidat prihvaćen na tečaj!');
  } catch {
    return res.status(404);
  }
};

const denyCandidatesForCourse = async (req: Request, res: Response) => {
  try {
    const candidate = await UserCourse.findOne({ where: { id: req.params.id } });
    if (!candidate) return res.status(404).send('Nema takvog UserCoursea');
    candidate.status = 2;
    await candidate.save();
    return res.send('Kandidat uklonjen sa tečaja!');
  } catch {
    return res.status(404);
  }
};

const seeYourCourseApplications = async (req: Request, res: Response) => {
  try {
    const applications = await UserCourse.findAll({ where: { userId: req.params.userId } });
    if (!applications) return res.send('Trenutno nemate aktivnih prijava na tečajeve!');
    return res.json({ ...applications });
  } catch {
    return res.status(404);
  }
};

const sendApplicationForCourse = async (req: Request, res: Response) => {
  try {
    const application = {
      status: 0,
      userId: req.params.userId,
      courseId: req.params.courseId,
    };
    UserCourse.create(application);
    return res.status(CREATED).send('Uspješno ste poslali prijavu za tečaj!');
  } catch {
    return res.status(404);
  }
};
export {
  getCandidatesForCourse,
  acceptCandidatesForCourse,
  denyCandidatesForCourse,
  seeYourCourseApplications,
  sendApplicationForCourse,
};
