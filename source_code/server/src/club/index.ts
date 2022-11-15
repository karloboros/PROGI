import { create, fetchPending } from './club.controller';
import authenticate from 'shared/auth/authenticate';
import refresh from 'shared/auth/refresh';
import { Router } from 'express';

const router = Router();
const path = '/clubs';

router.post('/create', authenticate, refresh, create).get('/pending', authenticate, refresh, fetchPending);

export default { router, path };
