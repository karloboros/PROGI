const createFilterOptions = array => {
  const options = [{ value: 0, label: 'All' }];
  options.push(...array.map(({ id: value, name: label }) => ({ value, label })));
  return options;
};

const formatCoordinates = coordinates => {
  return coordinates.split(',');
};

const getIds = array => {
  return array.map(({ id }) => id);
};

export { createFilterOptions, formatCoordinates, getIds };
