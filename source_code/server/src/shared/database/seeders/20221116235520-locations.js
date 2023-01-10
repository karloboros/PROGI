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
    locations.push({
      name: 'FER',
      coordinates: '45.800544952258214, 15.97129146730023',
    });
    locations.push({
      name: 'NSB',
      coordinates: '45.79679174376743, 15.977597443055902',
    });
    locations.push({
      name: 'restoran Zlatna Bula',
      coordinates: '45.797016149343186, 15.974228588669392',
    });
    return queryInterface.bulkInsert(TABLE_NAME, locations);
  },
  down(queryInterface) {
    return queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};
