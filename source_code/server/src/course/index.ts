import { Router } from 'express';
import { test } from './course.controller';

const router = Router();
const path = '/courses';

router.get('/test', test);

export default { router, path };