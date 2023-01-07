import { create, edit, remove, fetchAll } from './lesson.controller';
import { Router } from 'express';

const router = Router();
const path = '/lessons';

router
  .get('/:courseId', fetchAll)
  .post('/create', create)
  .post('/edit/:id', edit)
  .delete('/remove/:id', remove);

export default { router, path };
