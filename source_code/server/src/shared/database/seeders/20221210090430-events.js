const TABLE_NAME = 'events';

const createEvent = (name, clubId, locationId, startTime) => {
  return {
    name,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    image: '/images/dances/thumbnail.png',
    clubId,
    locationId,
    startTime,
  };
};

module.exports = {
  up(queryInterface) {
    const events = [];
    events.push(createEvent('Event Fun', 1, 1, new Date('2023')));
    events.push(createEvent('Dance party', 2, 2, new Date('2023-01-25')));
    events.push(createEvent('Tango night', 2, 3, new Date('2023-04-20')));
    events.push(createEvent('Valcer', 3, 4, new Date('2023-03-02')));
    events.push(createEvent('Dance, dance, dance', 4, 5, new Date('2023-01-15')));
    events.push(createEvent('Formal dance ball', 5, 5, new Date('2023-03-25')));
    events.push(createEvent('Dance festival Zagreb', 5, 6, new Date('2023-01-11')));
    events.push(createEvent('Just dance', 5, 7, new Date('2023-01-20')));
    events.push(createEvent('Party', 5, 8, new Date('2023-02-25')));
    return queryInterface.bulkInsert(TABLE_NAME, events);
  },

  down(queryInterface) {
    return queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};
