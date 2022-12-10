import { Router } from 'express';
import { test } from './trainerApplication.controller';

const router = Router();
const path = '/trainerApplications';

router.get('/test', test);

export default { router, path };
