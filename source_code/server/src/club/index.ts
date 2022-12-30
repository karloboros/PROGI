import { create, fetchAll, fetchPending, updateApprovalStatus } from './club.controller';
import authenticate from 'shared/auth/authenticate';
import refresh from 'shared/auth/refresh';
import { Router } from 'express';

const router = Router();
const path = '/clubs';

router
  .use(authenticate)
  .use(refresh)
  .post('/create', create)
  .get('/pending', fetchPending)
  .get('/all', fetchAll)
  .post('/update-approval', updateApprovalStatus);

export default { router, path };
