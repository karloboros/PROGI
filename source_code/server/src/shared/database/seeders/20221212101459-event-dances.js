const TABLE_NAME = 'event_dances';

const createEventDance = (eventId, danceId) => {
  return {
    eventId,
    danceId,
  };
};

module.exports = {
  async up(queryInterface) {
    const eventDances = [
      createEventDance(1, 1),
      createEventDance(1, 5),
      createEventDance(2, 2),
      createEventDance(3, 3),
      createEventDance(4, 4),
      createEventDance(5, 5),
      createEventDance(6, 5),
      createEventDance(7, 4),
      createEventDance(8, 1),
      createEventDance(9, 1),
    ];
    return queryInterface.bulkInsert(TABLE_NAME, eventDances);
  },

  down(queryInterface) {
    return queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};
