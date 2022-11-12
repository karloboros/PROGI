const REQUIRED_MESSAGE = 'This field is required!';

const validationRules = {
  required: {
    required: true,
    message: REQUIRED_MESSAGE,
    trigger: ['input'],
  },
  dateRequired: {
    required: true,
    type: 'number',
    message: REQUIRED_MESSAGE,
    trigger: ['blur', 'change'],
  },
};

export default validationRules;
