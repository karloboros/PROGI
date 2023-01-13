import { timespans } from '@/constants';

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

const getTimespanIds = lessons => {
  return lessons.map(({ startTime }) => {
    const startHour = new Date(startTime).getHours();
    const { id } = timespans.find(timespan => startHour >= timespan.startHour && startHour < timespan.endHour);
    return id;
  });
};

export { createFilterOptions, formatCoordinates, getIds, getTimespanIds };
