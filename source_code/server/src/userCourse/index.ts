import { apply, getApproved, getPending, getUsersApplications, updateStatus } from './userCourse.controller';
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
  .get('/pending/:courseId', getPending)
  .get('/:userId', getUsersApplications);

export default { router, path };
