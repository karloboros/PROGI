import authenticate from 'shared/auth/authenticate';
import { create } from './club.controller';
import refresh from 'shared/auth/refresh';
import { Router } from 'express';

const router = Router();
const path = '/clubs';

router.post('/create', authenticate, refresh, create);

export default { router, path };
