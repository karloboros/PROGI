const TABLE_NAME = 'eventDances';

const createEventDance = index => {
  return {
    danceId: `${index}`,
    danceballId: `${index}`,
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
