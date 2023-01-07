<<<<<<< HEAD
import { fetchEventDance, fetchEventLocation } from './event.controller';
import { Router } from 'express';
=======
import { create, uploadEventImage } from './event.controller';
import authenticate from 'shared/auth/authenticate';
import fs from 'fs';
import multer from 'multer';
import refresh from 'shared/auth/refresh';
import { Router } from 'express';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const filePath = '.tmp/images/events';
    fs.mkdirSync(filePath, { recursive: true });
    cb(null, filePath);
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname);
  },
});
>>>>>>> develop

const router = Router();
const path = '/events';

<<<<<<< HEAD
router.get('/events-with-location', fetchEventLocation).get('/event-Dance', fetchEventDance);
=======
const upload = multer({ storage });

router.use(authenticate).use(refresh).post('/create', create).post('/upload', upload.single('file'), uploadEventImage);
>>>>>>> develop

export default { router, path };
