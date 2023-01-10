const TABLE_NAME = 'events';

module.exports = {
  up(queryInterface) {
    const events = [];
    events.push({
      name: `Event #1`,
      description: `bla bla`,
      image: `image one`,
      clubId: 1,
      locationId: 1,
    });
    events.push({
      name: `Event #2`,
      description: `bla bla`,
      image: `image one`,
      clubId: 2,
      locationId: 2,
    });
    events.push({
      name: `Event #3`,
      description: `bla bla`,
      image: `image one`,
      clubId: 2,
      locationId: 3,
    });
    events.push({
      name: `Event #4`,
      description: `bla bla`,
      image: `image one`,
      clubId: 3,
      locationId: 4,
    });
    events.push({
      name: `Event #5`,
      description: `bla bla`,
      image: `image one`,
      clubId: 4,
      locationId: 5,
    });
    events.push({
      name: `Ples studenata`,
      description: `tango`,
      image: `image one`,
      clubId: 5,
      locationId: 4,
    });
    events.push({
      name: `Ples u domu`,
      description: `valcer`,
      image: `image two`,
      clubId: 5,
      locationId: 5,
    });
    return queryInterface.bulkInsert(TABLE_NAME, events);
  },

  down(queryInterface) {
    return queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};
