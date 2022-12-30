import { create, edit, fetchAll, fetchById, remove, test } from './course.controller';
import { Router } from 'express';

const router = Router();
const path = '/courses';

// eslint-disable-next-line prettier/prettier
router
  .get('/test', test)
  .get('/all', fetchAll)
  .get('/:id', fetchById)
  .post('/create/:clubId', create)
  .post('/edit/:id', edit)
  .delete('/remove/:id', remove);

export default { router, path };
