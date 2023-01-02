const TABLE_NAME = 'events';

const createEvent = index => {
  return {
    name: `Event #${index}`,
    description: `Short event description`,
    image: `image #${index}`,
    clubId: 1,
    locationId: (index % 3) + 1,
  };
};

module.exports = {
  up(queryInterface) {
    const events = [];
    for (let i = 1; i < 6; i++) events.push(createEvent(i));
    events.push({
      name: `Ples studenata`,
      description: `tango`,
      image: `image one`,
      clubId: 2,
      locationId: 4,
    });
    events.push({
      name: `Ples u domu`,
      description: `valcer`,
      image: `image two`,
      clubId: 1,
      locationId: 5,
    });
    return queryInterface.bulkInsert(TABLE_NAME, events);
  },

  down(queryInterface) {
    return queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};
