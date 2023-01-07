import { eventDance, test } from './eventDance.controller';
import { Router } from 'express';

const router = Router();
const path = '/event-dances';

router.get('/eventDances', eventDance).get('/test', test);

export default { router, path };
