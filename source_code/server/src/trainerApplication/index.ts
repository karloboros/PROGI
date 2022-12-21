import { Router } from 'express';
// eslint-disable-next-line sort-imports
import { acceptApplication, denyApplication, sendApplication } from './trainerApplication.controller';

const router = Router();
const path = '/trainer-applications';

router.post('/send-application/:userId/:clubId', sendApplication);
router.get('/accept-application/:id', acceptApplication);
router.get('/deny-application/:id', denyApplication);

export default { router, path };
