import {
  edit,
  fetchAll,
  fetchById,
  login,
  logout,
  register,
  remove,
  removeById,
  uploadProfileImage,
} from './user.controller';
import authenticate from 'shared/auth/authenticate';
import fs from 'fs';
import multer from 'multer';
import refresh from 'shared/auth/refresh';
import { Router } from 'express';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const filePath = '.tmp/images/users';
    fs.mkdirSync(filePath, { recursive: true });
    cb(null, filePath);
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname);
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
  .post('/edit', edit)
  .delete('/', remove)
  .get('/all', fetchAll)
  .get('/:id', fetchById)
  .delete('/:id', removeById);

export default { router, path };
