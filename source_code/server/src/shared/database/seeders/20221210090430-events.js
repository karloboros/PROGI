const TABLE_NAME = 'events';

const createEvent = (name, clubId, locationId, startTime) => {
  return {
    name,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    image: '/images/events/thumbnail.png',
    clubId,
    locationId,
    startTime,
  };
};

module.exports = {
  up(queryInterface) {
    const events = [];
    events.push(createEvent('Event Fun', 1, 7, new Date('2023')));
    events.push(createEvent('Dance party', 2, 8, new Date('2023-01-25')));
    events.push(createEvent('Tango night', 2, 9, new Date('2023-04-20')));
    events.push(createEvent('Valcer', 3, 10, new Date('2023-03-02')));
    events.push(createEvent('Dance, dance, dance', 4, 11, new Date('2023-01-15')));
    events.push(createEvent('Formal dance ball', 5, 12, new Date('2023-03-25')));
    events.push(createEvent('Dance festival Zagreb', 5, 13, new Date('2023-01-11')));
    events.push(createEvent('Just dance', 6, 14, new Date('2023-01-20')));
    events.push(createEvent('Party', 6, 15, new Date('2023-02-25')));
    return queryInterface.bulkInsert(TABLE_NAME, events);
  },

  down(queryInterface) {
    return queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};
