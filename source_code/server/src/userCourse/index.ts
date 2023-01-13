import { apply, fetchApproved, fetchByCourseId, fetchPending, updateStatus } from './userCourse.controller';
import authenticate from 'shared/auth/authenticate';
import refresh from 'shared/auth/refresh';
import { Router } from 'express';

const router = Router();
const path = '/user-courses';

router
  .use(authenticate)
  .use(refresh)
  .get('/approved/:courseId', fetchApproved)
  .get('/pending/:courseId', fetchPending)
  .get('/:courseId', fetchByCourseId)
  .post('/apply/:courseId', apply)
  .post('/update-status/:id', updateStatus);

export default { router, path };
