import { Router } from 'express';
import { test } from './dance.controller';

const router = Router();
const path = '/dances';

router.get('/test', test);

export default { router, path };
