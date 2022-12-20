import { Router } from 'express';
import { test } from './lesson.controller';

const router = Router();
const path = '/lessons';

router.get('/test', test);

export default { router, path };
