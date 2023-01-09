import { subtractYears } from './dates.js';

const AGE_MINIMUM = 12;

export const REQUIRED_MESSAGE = 'This field is required!';
export const WRONG_EMAIL_FORMAT_MESSAGE = 'Wrong email format';
export const UNDER_AGE_MINIMUM_MESSAGE = `You need to be at least ${AGE_MINIMUM} years old to register`;
export const WRONG_PHONE_FORMAT_MESSAGE = 'Wrong number format';
export const WRONG_URL_FORMAT_MESSAGE = 'Wrong url format';

export const emailValidator = (_rule, value) => {
  if (!value) {
    return new Error(REQUIRED_MESSAGE);
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
    return new Error(WRONG_EMAIL_FORMAT_MESSAGE);
  }
  return true;
};

export const dateOfBirthValidator = (_rule, value) => {
  const dateMinimum = subtractYears(new Date(), AGE_MINIMUM);
  const timeMinimum = dateMinimum.getTime();

  if (value > timeMinimum) {
    return new Error(UNDER_AGE_MINIMUM_MESSAGE);
  }
  return true;
};

export const phoneNumberValidator = (_rule, value) => {
  if (!value) {
    return new Error(REQUIRED_MESSAGE);
  } else if (!/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{3,4})$/.test(value)) {
    return new Error(WRONG_PHONE_FORMAT_MESSAGE);
  }
  return true;
};

export const urlValidator = (_rule, value) => {
  if (!value) {
    return new Error(REQUIRED_MESSAGE);
  } else if (
    !/^(http(s):\/\/.)[-a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)$/g.test(value)
  ) {
    return new Error(WRONG_URL_FORMAT_MESSAGE);
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
  urlRequired: {
    required: true,
    validator: urlValidator,
    trigger: ['blur'],
  },
};

export default validationRules;
