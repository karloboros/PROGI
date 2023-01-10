import { create, fetchAll, uploadEventImage } from './event.controller';
import authenticate from 'shared/auth/authenticate';
import { createUpload } from 'shared/helpers/upload';
import refresh from 'shared/auth/refresh';
import { Router } from 'express';

const router = Router();
const path = '/events';

const upload = createUpload('images', 'events');

router
  .get('/', fetchAll)
  .use(authenticate)
  .use(refresh)
  .post('/create', create)
  .post('/upload', upload.single('file'), uploadEventImage);

export default { router, path };
