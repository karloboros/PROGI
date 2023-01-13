const TABLE_NAME = 'locations';

const createLocation = (name, coordinates) => {
  return {
    name,
    coordinates,
  };
};

module.exports = {
  up(queryInterface) {
    const locations = [];
    locations.push(createLocation('FER', '45.800544952258214, 15.97129146730023'));
    locations.push(createLocation('NSB', '45.79679174376743, 15.977597443055902'));
    locations.push(createLocation('Restoran Zlatna Bula', '45.797016149343186, 15.974228588669392'));
    locations.push(createLocation('Park Maksimir', `45.826220886650596, 16.017775998127803`));
    locations.push(createLocation('Park Bundek', `45.788845327464095, 15.983870481816664`));
    locations.push(createLocation('Park Voltino', `45.8024060269027, 15.929989622562529`));
    locations.push(createLocation('Uciteljski fakultet', `45.797497275287135, 15.962135121668695`));
    locations.push(createLocation('Studentski dom Cvjetno naselje', `45.79172233419013, 15.961341187737135`));
    return queryInterface.bulkInsert(TABLE_NAME, locations);
  },
  down(queryInterface) {
    return queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};
