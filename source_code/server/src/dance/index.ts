import { create, edit, fetchAll, fetchById, fetchDanceEvent, remove, uploadDanceImage } from './dance.controller';
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
  .get('/dance-events', fetchDanceEvent)
  .get('/all', fetchAll)
  .use(authenticate)
  .use(refresh)
  .get('/:id', fetchById)
  .post('/create', create)
  .post('/edit/:id', edit)
  .delete('/remove/:id', remove)
  .post('/upload', upload.single('file'), uploadDanceImage);

export default { router, path };
