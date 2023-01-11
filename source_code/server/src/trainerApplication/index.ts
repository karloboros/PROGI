import { apply, fetchApproved, fetchPending, updateStatus, uploadPDF } from './trainerApplication.controller';
import authenticate from 'shared/auth/authenticate';
import { createUpload } from 'shared/helpers/upload';
import refresh from 'shared/auth/refresh';
import { Router } from 'express';

const router = Router();
const path = '/trainer-applications';

const upload = createUpload('pdf', 'trainerApplications');

router
  .use(authenticate)
  .use(refresh)
  .get('/approved/:clubId', fetchApproved)
  .get('/pending/:clubId', fetchPending)
  .post('/apply/:clubId', apply)
  .post('/update-status/:id', updateStatus)
  .post('/upload', upload.single('file'), uploadPDF);

export default { router, path };
