import { create, fetchPending, updateApprovalStatus } from './club.controller';
import authenticate from 'shared/auth/authenticate';
import refresh from 'shared/auth/refresh';
import { Router } from 'express';

const router = Router();
const path = '/clubs';

router
  .post('/create', authenticate, refresh, create)
  .get('/pending', authenticate, refresh, fetchPending)
  .post('/update-approval', authenticate, refresh, updateApprovalStatus);

export default { router, path };
