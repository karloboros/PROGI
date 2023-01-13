import { create, edit, fetchAll, fetchById, fetchDanceEvents, remove, uploadDanceImage } from './dance.controller';
import authenticate from 'shared/auth/authenticate';
import { createUpload } from 'shared/helpers/upload';
import refresh from 'shared/auth/refresh';
import { Router } from 'express';

const router = Router();
const path = '/dances';

const upload = createUpload('images', 'dances');

router
  .get('/', fetchAll)
  .get('/events', fetchDanceEvents)
  .use(authenticate)
  .use(refresh)
  .get('/:id', fetchById)
  .post('/create', create)
  .post('/edit/:id', edit)
  .post('/upload', upload.single('file'), uploadDanceImage)
  .delete('/:id', remove);

export default { router, path };
