const TABLE_NAME = 'dances';

const createDance = index => {
  return {
    name: `Dance #${index}`,
    description: `Short dance description`,
  };
};

module.exports = {
  async up(queryInterface) {
    const dances = [];
    for (let i = 1; i < 6; i++) dances.push(createDance(i));
    return queryInterface.bulkInsert(TABLE_NAME, dances);
  },

  down(queryInterface) {
    return queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};
