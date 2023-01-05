import { getAccepted, getPending, getRejected, send, updateStatus } from './trainerApplication.controller';
import { Router } from 'express';

const router = Router();
const path = '/trainer-applications';

router
  .post('/send/:userId/:clubId', send)
  .get('/update-status/:id/:isApproved', updateStatus)
  .get('/get-accepted/:clubId', getAccepted)
  .get('/get-pending/:clubId', getPending)
  .get('/get-rejected/:clubId', getRejected);

export default { router, path };
