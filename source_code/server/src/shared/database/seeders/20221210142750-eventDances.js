const TABLE_NAME = 'event_dances';

const createEventDance = index => {
  return {
    danceId: `${index}`,
    eventId: `${index}`,
  };
};

module.exports = {
  async up(queryInterface) {
    const eventDances = [];
    for (let i = 1; i < 6; i++) eventDances.push(createEventDance(i, ((i + 1) % 3) + 1));
    return queryInterface.bulkInsert(TABLE_NAME, eventDances);
  },

  down(queryInterface) {
    return queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};
