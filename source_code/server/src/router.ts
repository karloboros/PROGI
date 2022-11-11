import { Router } from 'express';

import user from 'user';

const router = Router();

router.use(user.path, user.router);

export default router;
