import { create, edit, fetchAll, fetchById, fetchDanceEvents, remove, uploadDanceImage } from './dance.controller';
import authenticate from 'shared/auth/authenticate';
import fs from 'fs';
import multer from 'multer';
import refresh from 'shared/auth/refresh';
import { Router } from 'express';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const filePath = '.tmp/images/dances';
    fs.mkdirSync(filePath, { recursive: true });
    cb(null, filePath);
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname);
  },
});

const router = Router();
const path = '/dances';

const upload = multer({ storage });

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
