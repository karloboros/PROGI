import { create, edit, fetchAll, fetchByClub, fetchById, fetchByTrainer, remove } from './course.controller';
import authenticate from 'shared/auth/authenticate';
import refresh from 'shared/auth/refresh';
import { Router } from 'express';

const router = Router();
const path = '/courses';

router
  .use(authenticate)
  .use(refresh)
  .get('/', fetchAll)
  .get('/:id', fetchById)
  .get('/club/:clubId', fetchByClub)
  .get('/trainer/:trainerId', fetchByTrainer)
  .post('/create', create)
  .post('/edit/:id', edit)
  .delete('/:id', remove);

export default { router, path };
