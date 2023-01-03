import { fetchCoursesLocations } from './course.controller';
import { Router } from 'express';

const router = Router();
const path = '/courses';

router.get('/all', fetchCoursesLocations);

export default { router, path };
