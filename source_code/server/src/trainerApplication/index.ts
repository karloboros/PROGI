import { fetchApproved, test } from './trainerApplication.controller';
import { Router } from 'express';

const router = Router();
const path = '/trainer-applications';

router.get('/test', test).get('/approved', fetchApproved);

export default { router, path };
