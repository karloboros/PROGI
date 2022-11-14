import { login, logout, register, uploadProfileImage } from './user.controller';
import { Router } from 'express';

const router = Router();
const path = '/users';

router.post('/login', login).post('/register', register).post('/logout', logout).post('/upload', uploadProfileImage);

export default { router, path };
