import {
  create,
  edit,
  fetchAll,
  fetchApproved,
  fetchById,
  fetchPending,
  remove,
  updateApprovalStatus,
} from './club.controller';
import authenticate from 'shared/auth/authenticate';
import refresh from 'shared/auth/refresh';
import { Router } from 'express';

const router = Router();
const path = '/clubs';

router
  .use(authenticate)
  .use(refresh)
  .get('/all', fetchAll)
  .get('/:id', fetchById)
  .post('/create', create)
  .post('/edit/:id', edit)
  .delete('/remove/:id', remove)
  .get('/pending', fetchPending)
  .get('/approved', fetchApproved)
  .post('/update-approval', updateApprovalStatus);

export default { router, path };
