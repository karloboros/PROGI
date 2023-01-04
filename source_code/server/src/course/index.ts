import { fetchById, fetchCoursesLocations } from './course.controller';
import { Router } from 'express';

const router = Router();
const path = '/courses';

router.get('/all', fetchCoursesLocations);
router.get('/:id', fetchById);

export default { router, path };
