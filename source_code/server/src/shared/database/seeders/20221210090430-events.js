const TABLE_NAME = 'events';

const createEvent = (name, clubId, locationId) => {
  return {
    name,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    image: '/images/dances/thumbnail.png',
    clubId,
    locationId,
  };
};

module.exports = {
  up(queryInterface) {
    const events = [];
    events.push(createEvent('Event Fun', 1, 1));
    events.push(createEvent('Dance party', 2, 2));
    events.push(createEvent('Tango night', 2, 3));
    events.push(createEvent('Valcer', 3, 4));
    events.push(createEvent('Dance, dance, dance', 4, 5));
    events.push(createEvent('Formal dance ball', 5, 5));
    events.push(createEvent('Dance festival Zagreb', 5, 6));
    events.push(createEvent('Just dance', 5, 7));
    events.push(createEvent('Party', 5, 8));
    return queryInterface.bulkInsert(TABLE_NAME, events);
  },

  down(queryInterface) {
    return queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};
