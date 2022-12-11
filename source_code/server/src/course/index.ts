import { Router } from 'express';
import { test } from './course.controller';

const router = Router();

router.get('/test', test);

export default { router };
