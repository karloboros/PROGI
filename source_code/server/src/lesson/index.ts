import { create, edit, fetchAll, remove, test } from './lesson.controller';
import { Router } from 'express';

const router = Router();
const path = '/lessons';

// eslint-disable-next-line prettier/prettier
router
  .get('/test', test)
  .get('/all/:courseId', fetchAll)
  .post('/create', create)
  .post('/edit/:id', edit)
  .delete('/remove/:id', remove);

export default { router, path };
