import {
  edit,
  fetchAll,
  fetchById,
  fetchTrainers,
  login,
  logout,
  register,
  remove,
  removeById,
  uploadProfileImage,
} from './user.controller';
import authenticate from 'shared/auth/authenticate';
import { createUpload } from 'shared/helpers/upload';
import refresh from 'shared/auth/refresh';
import { Router } from 'express';

const router = Router();
const path = '/users';

const upload = createUpload('images', 'users');

router
  .post('/login', login)
  .post('/register', register)
  .post('/logout', logout)
  .post('/upload', upload.single('file'), uploadProfileImage)
  .use(authenticate)
  .use(refresh)
  .get('/', fetchAll)
  .get('/:id', fetchById)
  .get('/trainers', fetchTrainers)
  .post('/edit', edit)
  .delete('/', remove)
  .delete('/:id', removeById);

export default { router, path };
