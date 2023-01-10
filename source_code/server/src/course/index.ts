import { create, edit, fetchAll, fetchByClub, fetchById, remove } from './course.controller';
import authenticate from 'shared/auth/authenticate';
import refresh from 'shared/auth/refresh';
import { Router } from 'express';

const router = Router();
const path = '/courses';

router
  .use(authenticate)
  .use(refresh)
  .get('/all', fetchAll)
  .get('/:id', fetchById)
  .get('/byClub/:clubId', fetchByClub)
  .post('/create', create)
  .post('/edit/:id', edit)
  .delete('/remove/:id', remove);

export default { router, path };
