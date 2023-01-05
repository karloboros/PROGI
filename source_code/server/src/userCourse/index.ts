import { get, getForClub, send, updateStatus } from './userCourse.controller';

import { Router } from 'express';

const router = Router();
const path = '/user-courses';

router
  .get('/get/:courseId', get)
  .get('/update-status/:id/:isApproved', updateStatus)
  .get('/see-applications/:userId', getForClub)
  .get('/apply/:userId/:courseId', send);

export default { router, path };
