const TABLE_NAME = 'courses';

const createCourse = index => {
  return {
    name: `Course #${index}`,
    description: `Description #${index}`,
    capacity: 20,
    applicationDeadline: new Date('2023'),
    clubId: 1,
    danceId: 2,
    locationId: (index % 3) + 1,
    trainerId: 8,
  };
};
module.exports = {
  async up(queryInterface) {
    const courses = [];
    for (let i = 1; i < 4; i++) courses.push(createCourse(i));
    return queryInterface.bulkInsert(TABLE_NAME, courses);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};
