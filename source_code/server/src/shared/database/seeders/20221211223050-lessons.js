const TABLE_NAME = 'lessons';

const createCourse = () => {
  return {
    startTime: new Date('2023'),
    endTime: new Date('2024'),
    courseId: 1,
  };
};
module.exports = {
  up(queryInterface) {
    const lessons = [];
    for (let i = 1; i < 4; i++) lessons.push(createCourse());
    return queryInterface.bulkInsert(TABLE_NAME, lessons);
  },

  down(queryInterface) {
    return queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};
