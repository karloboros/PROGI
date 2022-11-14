const options = ['@gmail.com', '@fer.hr', '@outlook.com'];

const suggestions = email => {
  return options.map(suffix => {
    const prefix = email.split('@')[0];
    return {
      label: prefix + suffix,
      value: prefix + suffix,
    };
  });
};

export default suggestions;
