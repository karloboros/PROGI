import { create, edit, fetchAll, fetchById, remove, uploadDanceImage } from './dance.controller';
import authenticate from 'shared/auth/authenticate';
import multer from 'multer';
import refresh from 'shared/auth/refresh';
import { Router } from 'express';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, '.tmp/images/dances');
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
  .get('/all', fetchAll)
  .get('/:id', fetchById)
  .post('/create', create)
  .post('/edit/:id', edit)
  .delete('/remove/:id', remove)
  .post('/upload', upload.single('file'), uploadDanceImage);
  
export default { router, path };
