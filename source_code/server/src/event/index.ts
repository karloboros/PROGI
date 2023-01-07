import { fetchEventDance, fetchEventLocation } from './event.controller';
import { Router } from 'express';

const router = Router();
const path = '/events';

router.get('/events-with-location', fetchEventLocation).get('/event-Dance', fetchEventDance);

export default { router, path };
