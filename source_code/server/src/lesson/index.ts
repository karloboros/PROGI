import { create, edit, fetchAll, fetchById, remove } from './lesson.controller';
import authenticate from 'shared/auth/authenticate';
import refresh from 'shared/auth/refresh';
import { Router } from 'express';

const router = Router();
const path = '/lessons';

router
  .use(authenticate)
  .use(refresh)
  .get('/:courseId', fetchAll)
  .get('/one/:id', fetchById)
  .post('/create', create)
  .post('/edit/:id', edit)
  .delete('/remove/:id', remove);

export default { router, path };
