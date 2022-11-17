const TABLE_NAME = 'locations';

const createLocation = index => {
  return {
    name: `Location#${index}`,
    coordinates: `45.8426414,15.962231${index}`,
  };
};

module.exports = {
  up(queryInterface) {
    const locations = [];
    for (let i = 1; i < 4; i++) locations.push(createLocation(i));
    return queryInterface.bulkInsert(TABLE_NAME, locations);
  },
  down(queryInterface) {
    return queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};
