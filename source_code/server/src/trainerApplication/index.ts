import { apply, getAccepted, getPending, updateStatus, uploadPDF } from './trainerApplication.controller';
import authenticate from 'shared/auth/authenticate';
import fs from 'fs';
import multer from 'multer';
import refresh from 'shared/auth/refresh';
import { Router } from 'express';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const filePath = '.tmp/pdf/trainerApplications';
    fs.mkdirSync(filePath, { recursive: true });
    cb(null, filePath);
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname);
  },
});

const upload = multer({ storage });

const router = Router();
const path = '/trainer-applications';

router
  .use(authenticate)
  .use(refresh)
  .post('/apply/:clubId', apply)
  .post('/update-status', updateStatus)
  .post('/upload', upload.single('file'), uploadPDF)
  .get('/accepted/:clubId', getAccepted)
  .get('/pending/:clubId', getPending);

export default { router, path };
