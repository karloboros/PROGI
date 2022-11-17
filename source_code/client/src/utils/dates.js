const subtractYears = (date, years) => {
  date.setFullYear(date.getFullYear() - years);
  return date;
};

const toDatePicker = dateString => {
  return new Date(dateString).getTime();
};

export { subtractYears, toDatePicker };
