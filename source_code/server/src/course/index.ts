import { create, edit, fetchAll, fetchByClub, fetchById, remove, test } from './course.controller';
import authenticate from 'shared/auth/authenticate';
import refresh from 'shared/auth/refresh';
import { Router } from 'express';

const router = Router();
const path = '/courses';

// eslint-disable-next-line prettier/prettier
router
  .use(authenticate)
  .use(refresh)
  .get('/test', test)
  .get('/all', fetchAll)
  .get('/:id', fetchById)
  .get('/test/:clubId', fetchByClub)
  .post('/create/:clubId', create)
  .post('/edit/:id', edit)
  .delete('/remove/:id', remove);

export default { router, path };
