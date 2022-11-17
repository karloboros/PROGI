const TABLE_NAME = 'clubs';

const createClub = index => {
  return {
    name: `Club #${index}`,
    phone: `097654321${index}`,
    email: `club${index}@gmail.com`,
    description: `Short club description`,
    approvalStatus: 0,
    ownerId: 4,
    locationId: (index % 3) + 1,
  };
};

module.exports = {
  up(queryInterface) {
    const clubs = [];
    for (let i = 1; i < 6; i++) clubs.push(createClub(i));
    return queryInterface.bulkInsert(TABLE_NAME, clubs);
  },
  down(queryInterface) {
    return queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};
