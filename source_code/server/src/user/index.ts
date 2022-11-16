import { login, logout, register, remove, uploadProfileImage } from './user.controller';
import authenticate from 'shared/auth/authenticate';
import multer from 'multer';
import refresh from 'shared/auth/refresh';
import { Router } from 'express';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, '.tmp');
  },
  filename: (_req, _file, cb) => {
    cb(null, Date.now() + '_' + _file.originalname);
  },
});

const upload = multer({ storage });

const router = Router();
const path = '/users';

router
  .post('/login', login)
  .post('/register', register)
  .post('/logout', logout)
  .post('/upload', upload.single('file'), uploadProfileImage)
  .use(authenticate)
  .use(refresh)
  .delete('/', remove);

export default { router, path };
