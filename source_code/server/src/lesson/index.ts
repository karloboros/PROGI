import { create, edit, fetchByCourseId, fetchById, remove } from './lesson.controller';
import authenticate from 'shared/auth/authenticate';
import refresh from 'shared/auth/refresh';
import { Router } from 'express';

const router = Router();
const path = '/lessons';

router
  .use(authenticate)
  .use(refresh)
  .get('/course/:courseId', fetchByCourseId)
  .get('/:id', fetchById)
  .post('/create', create)
  .post('/edit/:id', edit)
  .delete('/:id', remove);

export default { router, path };
