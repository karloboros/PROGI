import { test1, test2 } from './userCourse.controller';
import { Router } from 'express';

const router = Router();
const path = '/user-courses';

router.get('/test1', test1);
router.get('/test2', test2);

export default { router, path };
