import { Router } from 'express';
import { test } from './event.controller';

const router = Router();
const path = '/events';

router.get('/test', test);

export default { router, path };
