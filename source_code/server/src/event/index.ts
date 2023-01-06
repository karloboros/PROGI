import { create, uploadEventImage } from './event.controller';
import authenticate from 'shared/auth/authenticate';
import multer from 'multer';
import refresh from 'shared/auth/refresh';
import { Router } from 'express';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, '.tmp/images/events');
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname);
  },
});

const router = Router();
const path = '/events';

const upload = multer({ storage });

router.use(authenticate).use(refresh).post('/create', create).post('/upload', upload.single('file'), uploadEventImage);

export default { router, path };
