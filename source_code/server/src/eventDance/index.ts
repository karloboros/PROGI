import { eventDance } from './eventDance.controller';
import { Router } from 'express';

const router = Router();
const path = '/event-dances';

router.get('/eventDances', eventDance);

export default { router, path };
