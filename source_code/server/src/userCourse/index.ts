import { apply, fetchPending, getApproved, getUsersApplications, updateStatus } from './userCourse.controller';
import authenticate from 'shared/auth/authenticate';
import refresh from 'shared/auth/refresh';
import { Router } from 'express';

const router = Router();
const path = '/user-courses';

router
  .use(authenticate)
  .use(refresh)
  .post('/apply/:courseId', apply)
  .post('/update-status', updateStatus)
  .get('/approved/:courseId', getApproved)
  .get('/pending/:courseId', fetchPending)
  .get('/:userId', getUsersApplications);

export default { router, path };
