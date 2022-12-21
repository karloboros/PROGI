import {
  acceptCandidatesForCourse,
  denyCandidatesForCourse,
  getCandidatesForCourse,
  seeYourCourseApplications,
  sendApplicationForCourse,
} from './userCourse.controller';

import { Router } from 'express';

const router = Router();
const path = '/user-courses';

router.get('/get-candidate/:courseId', getCandidatesForCourse);
router.get('/accept-candidate/:id', acceptCandidatesForCourse);
router.get('/deny-candidate/:id', denyCandidatesForCourse);
router.get('/see-applications/:userId', seeYourCourseApplications);
router.get('/apply-for-course/:userId/:courseId', sendApplicationForCourse);

export default { router, path };
