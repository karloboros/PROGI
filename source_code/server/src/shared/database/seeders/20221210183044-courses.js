const TABLE_NAME = 'courses';

const createCourse = (name, applicationDeadline, clubId, danceId, locationId, trainerId, gender, minAge) => {
  return {
    name,
    description: `Plesemo i zabavljamo se.`,
    capacity: 5,
    applicationDeadline,
    clubId,
    danceId,
    locationId,
    trainerId,
    gender,
    minAge,
    additionalRules: 'Budite dobro raspoloženi!',
  };
};
module.exports = {
  async up(queryInterface) {
    const courses = [];
    courses.push(createCourse(`Cha cha`, new Date(2023, 4, 2), 1, 1, 1, 8, 0, null));
    courses.push(createCourse(`PLesnjae party`, new Date(2023, 4, 8), 1, 2, 1, 13, 0, null));
    courses.push(createCourse(`Loco`, new Date(2023, 7, 8), 2, 3, 2, 13, 0, null));
    courses.push(createCourse(`Plesanje tecaj`, new Date(2023, 1, 1), 3, 4, 3, 14, 1, null));
    courses.push(createCourse(`Tecaj suvremenog plesa`, new Date(2023, 2, 2), 4, 5, 4, 13, 1, 20));
    courses.push(createCourse(`nauci plesati`, new Date(2023, 4, 3), 5, 1, 5, 13, null, 20));
    courses.push(createCourse(`Cha cha cha`, new Date(2023, 2, 3), 6, 2, 6, 14, null, 20));
    return queryInterface.bulkInsert(TABLE_NAME, courses);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};
