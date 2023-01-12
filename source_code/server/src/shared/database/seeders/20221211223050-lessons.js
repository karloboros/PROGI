const TABLE_NAME = 'lessons';

const createCourse = (startTime, endTime) => {
  return {
    startTime,
    endTime,
    courseId: 1,
  };
};
module.exports = {
  up(queryInterface) {
    const lessons = [];
    lessons.push(createCourse(new Date(2023, 4, 5, 10, 0), new Date(2023, 4, 5, 11, 0)));
    lessons.push(createCourse(new Date(2023, 4, 7, 12, 0), new Date(2023, 4, 7, 12, 45)));
    lessons.push(createCourse(new Date(2023, 4, 9, 12, 0), new Date(2023, 4, 9, 12, 45)));
    lessons.push(createCourse(new Date(2023, 4, 11, 12, 0), new Date(2023, 4, 11, 12, 45)));
    lessons.push(createCourse(new Date(2023, 4, 12, 12, 0), new Date(2023, 4, 12, 12, 55)));
    lessons.push(createCourse(new Date(2023, 4, 13, 8, 30), new Date(2023, 4, 13, 10, 0)));
    lessons.push(createCourse(new Date(2023, 4, 15, 8, 30), new Date(2023, 4, 15, 10, 0)));
    lessons.push(createCourse(new Date(2023, 4, 18, 8, 30), new Date(2023, 4, 18, 10, 0)));
    return queryInterface.bulkInsert(TABLE_NAME, lessons);
  },

  down(queryInterface) {
    return queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};
