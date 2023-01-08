const TABLE_NAME = 'locations';

module.exports = {
  up(queryInterface) {
    const locations = [];
    locations.push({ name: 'Park Maksimir', coordinates: `45.826220886650596, 16.017775998127803` });
    locations.push({ name: 'Park Bundek', coordinates: `45.788845327464095, 15.983870481816664` });
    locations.push({ name: 'Park Voltino', coordinates: `45.8024060269027, 15.929989622562529` });
    locations.push({ name: 'Uciteljski fakultet', coordinates: `45.797497275287135, 15.962135121668695` });
    locations.push({ name: 'Studentski dom Cvjetno naselje', coordinates: `45.79172233419013, 15.961341187737135` });
    return queryInterface.bulkInsert(TABLE_NAME, locations);
  },
  down(queryInterface) {
    return queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};
