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
  .get('/', fetchAll)
  .use(authenticate)
  .use(refresh)
  .get('/:id', fetchById)
  .get('/approved', fetchApproved)
  .get('/pending', fetchPending)
  .post('/create', create)
  .post('/edit/:id', edit)
  .post('/update-approval', updateApprovalStatus)
  .delete('/:id', remove);

export default { router, path };
