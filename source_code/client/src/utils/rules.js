const REQUIRED_MESSAGE = 'This field is required!';
const WRONG_EMAIL_FORMAT_MESSAGE = 'Wrong email format';
const WRONG_PHONE_FORMAT_MESSAGE = 'Wrong number format';

const emailValidator = (_rule, value) => {
  console.log(value);
  if (!value) {
    return new Error(REQUIRED_MESSAGE);
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
    return new Error(WRONG_EMAIL_FORMAT_MESSAGE);
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
  phoneRequired: {
    required: true,
    validator: phoneNumberValidator,
    trigger: ['blur', 'input'],
  },
};

export default validationRules;
