import { Router } from 'express';

// eslint-disable-next-line sort-imports
import club from 'club';
import course from 'course';
import dance from 'dance';
import event from 'event';
import eventDance from 'eventDance';
import trainerApplication from 'trainerApplication';
import user from 'user';
import userCourse from 'userCourse';

const router = Router();

router.use(club.path, club.router);
router.use(course.path, course.router);
router.use(dance.path, dance.router);
router.use(event.path, event.router);
router.use(eventDance.path, eventDance.router);
router.use(trainerApplication.path, trainerApplication.router);
router.use(user.path, user.router);
router.use(userCourse.path, userCourse.router);

export default router;
