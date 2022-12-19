import { create, edit, fetchAll, remove, uploadDanceImage } from './dance.controller';
import authenticate from 'shared/auth/authenticate';
import multer from 'multer';
import refresh from 'shared/auth/refresh';
import { Router } from 'express';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, '.tmp/images');
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname);
  },
});

const router = Router();
const path = '/dances';

const upload = multer({ storage });

router
  .use(authenticate)
  .use(refresh)
  .post('/create', create)
  .get('/all', fetchAll)
  .post('/upload', upload.single('file'), uploadDanceImage)
  .post('/edit/:id', edit)
  .delete('/:id', remove);

export default { router, path };
