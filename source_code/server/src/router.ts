import { Router } from 'express';

// eslint-disable-next-line sort-imports
import club from 'club';
import user from 'user';

const router = Router();

router.use(club.path, club.router);
router.use(user.path, user.router);

export default router;
