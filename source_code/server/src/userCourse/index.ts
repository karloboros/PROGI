import { getApproved, getForUser, getPending, getRejected, send, updateStatus } from './userCourse.controller';

import { Router } from 'express';

const router = Router();
const path = '/user-courses';

router
  .get('/get-approved/:courseId', getApproved)
  .get('/get-pending/:courseId', getPending)
  .get('/get-rejected/:courseId', getRejected)
  .get('/update-status/:id/:isApproved', updateStatus)
  .get('/see-applications/:userId', getForUser)
  .get('/apply/:userId/:courseId', send);

export default { router, path };
