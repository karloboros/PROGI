import { login } from './user.controller';
import { Router } from 'express';

const router = Router();
const path = '/users';

router.post('/login', login);

export default { router, path };
