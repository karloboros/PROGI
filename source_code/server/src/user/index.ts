import { login, logout, register, uploadProfileImage } from './user.controller';
import multer from 'multer';
import { Router } from 'express';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, '.tmp');
  },
  filename: (_req, _file, cb) => {
    cb(null, _file.originalname);
  },
});

const upload = multer({ storage });

const router = Router();
const path = '/users';

router
  .post('/login', login)
  .post('/register', register)
  .post('/logout', logout)
  .post('/upload', upload.single('file'), uploadProfileImage);

export default { router, path };
