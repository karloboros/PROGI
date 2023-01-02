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
    locations.push({ name: 'Uciteljski fakultet', coordinates: `45.797497275287135, 15.962135121668695` });
    locations.push({ name: 'Studentski dom Cvjetno naselje', coordinates: `45.79172233419013, 15.961341187737135` });
    return queryInterface.bulkInsert(TABLE_NAME, locations);
  },
  down(queryInterface) {
    return queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};
