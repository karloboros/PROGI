const errorMessages = {
  SIGN_IN: 'Incorrect user credentials.',
  REGISTER: 'Unable to create user, try different credentials.',
  FORBIDDEN: 'Your access to this resource is forbidden.',
  TOKEN_EXPIRED: 'Token has expired.',
  BAD_REQUEST: 'Cannot proccess the request.',
  UNIQUE: 'Values already in use, try different ones.',
  NOT_FOUND: 'Cannot find the resource, try refreshing the page.',
  CLUB_OWNER_DELETE: 'As a club owner you need delete your club first to delete your account.',
  COURSE_CREATE: 'Unable to create club, try different credentials.',
  COURSE_DELETE: 'Before deleting course, you need to delete all course lessons',
  LESSON_CREATE: 'Unable to create lesson, try diffrent values',
  EVENT_DANCE_DELETE: 'As this dance is danced on events, you need to delete events first.',
  CLUB_OWNER_DELETE_ADMIN: 'This user is club owner, in order to delete this profile, delete clubs first.',
  COURSE_USER_DELETE: 'To be able to delete this user, delete his courses applications first.',
  TRAINER_USER_DELETE: 'To be able to delete this user, delete his trainer applications first.',
};

export default errorMessages;
