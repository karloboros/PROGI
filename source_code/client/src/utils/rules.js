import { subtractYears } from './dates';

const AGE_MINIMUM = 12;

const REQUIRED_MESSAGE = 'This field is required!';
const WRONG_EMAIL_FORMAT_MESSAGE = 'Wrong email format';
const UNDER_AGE_MINIMUM_MESSAGE = `You need to be at least ${AGE_MINIMUM} years old to register`;
const WRONG_PHONE_FORMAT_MESSAGE = 'Wrong number format';
const WRONG_INT_MESSAGE = 'Wrong int format';
const WRONG_COORDINATES_MESSAGE =
  'Wrong coordinates format. Input two decimal numbers divided by comma. Example: 2.3456, 1.3456';

const emailValidator = (_rule, value) => {
  if (!value) {
    return new Error(REQUIRED_MESSAGE);
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
    return new Error(WRONG_EMAIL_FORMAT_MESSAGE);
  }
  return true;
};

const dateOfBirthValidator = (_rule, value) => {
  const dateMinimum = subtractYears(new Date(), AGE_MINIMUM);
  const timeMinimum = dateMinimum.getTime();

  if (value > timeMinimum) {
    return new Error(UNDER_AGE_MINIMUM_MESSAGE);
  }
  return true;
};

const phoneNumberValidator = (_rule, value) => {
  if (!value) {
    return new Error(REQUIRED_MESSAGE);
  } else if (!/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{3,4})$/.test(value)) {
    return new Error(WRONG_PHONE_FORMAT_MESSAGE);
  }
  return true;
};
const numberValidator = (_rule, value) => {
  if (!/^\(?(\d)$/.test(value)) {
    return new Error(WRONG_INT_MESSAGE);
  }
  return true;
};

const coordinatesValidator = (_rule, value) => {
  if (!value) {
    return new Error(REQUIRED_MESSAGE);
  } else if (!/[0-9]+.[0-9]+, [0-9]+.[0-9]+$/.test(value)) {
    return new Error(WRONG_COORDINATES_MESSAGE);
  }
  return true;
};

const validationRules = {
  required: {
    required: true,
    message: REQUIRED_MESSAGE,
    trigger: ['input'],
  },
  emailRequired: {
    required: true,
    validator: emailValidator,
    trigger: ['blur'],
  },
  dateRequired: {
    required: true,
    type: 'number',
    message: REQUIRED_MESSAGE,
    trigger: ['blur', 'change'],
  },
  dateOfBirth: {
    type: 'number',
    validator: dateOfBirthValidator,
    trigger: ['blur', 'change'],
  },
  phoneRequired: {
    required: true,
    validator: phoneNumberValidator,
    trigger: ['blur', 'input'],
  },
  number: {
    validator: numberValidator,
    trigger: ['blur', 'input'],
  },
  coordinatesRequired: {
    required: true,
    validator: coordinatesValidator,
    trigger: ['blur', 'input'],
  },
};

export default validationRules;
