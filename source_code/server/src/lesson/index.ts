import { create, edit, remove, test } from './lesson.controller';
import { Router } from 'express';

const router = Router();
const path = '/lessons';

// eslint-disable-next-line prettier/prettier
router
   .get('/test', test)
   .post('/create', create)
   .post('/edit', edit)
   .delete('/', remove);

export default { router, path };
