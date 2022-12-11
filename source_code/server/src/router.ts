import { Router } from 'express';

// eslint-disable-next-line sort-imports
import club from 'club';
import trainerApplication from 'trainerApplication';
import user from 'user';

const router = Router();

router.use(club.path, club.router);
router.use(trainerApplication.path, trainerApplication.router);
router.use(user.path, user.router);

export default router;
