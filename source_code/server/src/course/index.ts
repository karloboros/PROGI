import authenticate from 'shared/auth/authenticate';
import refresh from 'shared/auth/refresh';
import { Router } from 'express';
import { test } from './course.controller';

const router = Router();
const path = '/course';

router.use(authenticate).use(refresh).use(test);

export default { router, path };
