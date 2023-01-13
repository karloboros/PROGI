import { differenceInYears, format } from 'date-fns';

const subtractYears = (date, years) => {
  date.setFullYear(date.getFullYear() - years);
  return date;
};

const toDatePicker = dateString => {
  return new Date(dateString).getTime();
};

const formatDate = dateString => {
  const date = new Date(dateString);
  return format(date, 'yyyy-dd-MM hh:mm');
};

const getAge = dateOfBirthString => {
  const now = new Date();
  const dateOfBirth = new Date(dateOfBirthString);
  return differenceInYears(now, dateOfBirth);
};

export { subtractYears, toDatePicker, formatDate, getAge };
