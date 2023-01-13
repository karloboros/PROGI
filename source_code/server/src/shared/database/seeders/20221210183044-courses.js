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
    courses.push({
      name: `Cha cha`,
      description: `Description blabla}`,
      capacity: 12,
      applicationDeadline: new Date('2024'),
      clubId: 1,
      danceId: 1,
      locationId: 5,
      trainerId: 2,
    });
    courses.push({
      name: `Cha cha`,
      description: `Description blabla`,
      capacity: 12,
      applicationDeadline: new Date('2024'),
      clubId: 2,
      danceId: 3,
      locationId: 4,
      trainerId: 3,
    });
    return queryInterface.bulkInsert(TABLE_NAME, courses);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};
