import { create, edit, fetchAll, remove, test } from './lesson.controller';
import { Router } from 'express';

const router = Router();
const path = '/lessons';

router
  .get('/test', test)
  .get('/:courseId', fetchAll)
  .post('/create/:courseId', create)
  .post('/edit/:id', edit)
  .delete('/remove/:id', remove);

export default { router, path };
