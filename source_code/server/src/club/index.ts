import {
  create,
  edit,
  fetchAll,
  fetchApproved,
  fetchById,
  fetchByIdWithDances,
  fetchByOwner,
  fetchPending,
  fetchTrainersByClubId,
  fetchWithDances,
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
  .get('/dances', fetchWithDances)
  .get('/dances/:id', fetchByIdWithDances)
  .use(authenticate)
  .use(refresh)
  .get('/approved', fetchApproved)
  .get('/pending', fetchPending)
  .get('/trainers/:clubId', fetchTrainersByClubId)
  .get('/owner', fetchByOwner)
  .get('/:id', fetchById)
  .post('/create', create)
  .post('/edit/:id', edit)
  .post('/update-approval', updateApprovalStatus)
  .delete('/:id', remove);

export default { router, path };
