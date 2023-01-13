import { create, edit, fetchActive, fetchByClub, fetchById, fetchByTrainerId, remove } from './course.controller';
import authenticate from 'shared/auth/authenticate';
import refresh from 'shared/auth/refresh';
import { Router } from 'express';

const router = Router();
const path = '/courses';

router
  .use(authenticate)
  .use(refresh)
  .get('/', fetchActive)
  .get('/:id', fetchById)
  .get('/club/:clubId', fetchByClub)
  .get('/trainer/:trainerId', fetchByTrainerId)
  .post('/create', create)
  .post('/edit/:id', edit)
  .delete('/:id', remove);

export default { router, path };
