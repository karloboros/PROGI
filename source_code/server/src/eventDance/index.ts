import { Router } from 'express';
import { test } from './eventDance.controller';

const router = Router();
const path = '/event-dances';

router.get('/test', test);

export default { router, path };
