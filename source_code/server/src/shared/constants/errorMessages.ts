const errorMessages = {
  SIGN_IN: 'Incorrect user credentials.',
  REGISTER: 'Unable to create user, try different credentials.',
  FORBIDDEN: 'Your access to this resource is forbidden.',
  TOKEN_EXPIRED: 'Token has expired.',
  BAD_REQUEST: 'Cannot proccess the request.',
  UNIQUE: 'Values already in use, try different ones.',
  NOT_FOUND: 'Cannot find the resource, try refreshing the page.',
  CLUB_OWNER_DELETE: 'As a club owner you need delete your club first to delete your account.',
  EVENT_DANCE_DELETE: 'As this dance is danced on events, you need to delete events first.',
  NOT_CLUB_OWNER: 'You have to be owner of the club to add event connected to that club.',
};

export default errorMessages;
