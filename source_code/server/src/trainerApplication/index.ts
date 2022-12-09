import { create, fetchPending, updateApprovalStatus } from './trainerApplication.controller';
import authenticate from 'shared/auth/authenticate';
import refresh from 'shared/auth/refresh';
import { Router } from 'express';

const router = Router();
const path = '/trainerApplications';

router
  .use(authenticate)
  .use(refresh)
  .post('/create', create)
  .get('/pending', fetchPending)
  .post('/update-approval', updateApprovalStatus);

export default { router, path };
