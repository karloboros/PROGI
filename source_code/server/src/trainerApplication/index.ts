import { get, send, updateStatus } from './trainerApplication.controller';
import { Router } from 'express';

const router = Router();
const path = '/trainer-applications';

router.post('/send/:userId/:clubId', send).get('/update-status/:id/:isApproved', updateStatus).get('/get/:clubId', get);

export default { router, path };
