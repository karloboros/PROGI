import { create, edit, remove, test } from './course.controller';
import { Router } from 'express';

const router = Router();
const path = '/courses';

// eslint-disable-next-line prettier/prettier
router
  .get('/test', test)
  .post('/create/:id', create)
  .post('/edit/:id', edit)
  .delete('/remove/:id', remove);

export default { router, path };
