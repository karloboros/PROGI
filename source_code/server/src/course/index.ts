import { fetchAll, fetchById } from './course.controller';
import { Router } from 'express';

const router = Router();
const path = '/courses';

router.get('/all', fetchAll);
router.get('/:id', fetchById);

export default { router, path };
