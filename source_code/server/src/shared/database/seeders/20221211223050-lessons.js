const TABLE_NAME = 'lessons';

const createCourse = (startTime, endTime, courseId) => {
  return {
    startTime,
    endTime,
    courseId,
  };
};
module.exports = {
  up(queryInterface) {
    const lessons = [];
    lessons.push(createCourse(new Date(2023, 4, 5, 10, 0), new Date(2023, 4, 5, 11, 0), 1));
    lessons.push(createCourse(new Date(2023, 4, 7, 12, 0), new Date(2023, 4, 7, 12, 45), 1));
    lessons.push(createCourse(new Date(2023, 4, 9, 12, 0), new Date(2023, 4, 9, 12, 45), 1));
    lessons.push(createCourse(new Date(2023, 4, 11, 12, 0), new Date(2023, 4, 11, 12, 45), 1));
    lessons.push(createCourse(new Date(2023, 4, 12, 12, 0), new Date(2023, 4, 12, 12, 55), 1));
    lessons.push(createCourse(new Date(2023, 4, 13, 8, 30), new Date(2023, 4, 13, 10, 0), 1));
    lessons.push(createCourse(new Date(2023, 4, 15, 8, 30), new Date(2023, 4, 15, 10, 0), 1));
    lessons.push(createCourse(new Date(2023, 4, 18, 8, 30), new Date(2023, 4, 18, 10, 0), 1));

    lessons.push(createCourse(new Date(2023, 4, 5, 10, 0), new Date(2023, 4, 5, 11, 0), 2));
    lessons.push(createCourse(new Date(2023, 4, 7, 12, 0), new Date(2023, 4, 7, 12, 45), 2));
    lessons.push(createCourse(new Date(2023, 4, 9, 12, 0), new Date(2023, 4, 9, 12, 45), 2));
    lessons.push(createCourse(new Date(2023, 4, 11, 12, 0), new Date(2023, 4, 11, 12, 45), 2));

    lessons.push(createCourse(new Date(2023, 4, 12, 12, 0), new Date(2023, 4, 12, 12, 55), 3));
    lessons.push(createCourse(new Date(2023, 4, 13, 8, 30), new Date(2023, 4, 13, 10, 0), 3));
    lessons.push(createCourse(new Date(2023, 4, 15, 8, 30), new Date(2023, 4, 15, 10, 0), 3));
    lessons.push(createCourse(new Date(2023, 4, 18, 8, 30), new Date(2023, 4, 18, 10, 0), 3));

    lessons.push(createCourse(new Date(2023, 4, 5, 10, 0), new Date(2023, 4, 5, 11, 0), 4));
    lessons.push(createCourse(new Date(2023, 4, 7, 12, 0), new Date(2023, 4, 7, 12, 45), 4));
    lessons.push(createCourse(new Date(2023, 4, 9, 12, 0), new Date(2023, 4, 9, 12, 45), 4));

    lessons.push(createCourse(new Date(2023, 4, 11, 12, 0), new Date(2023, 4, 11, 12, 45), 5));
    lessons.push(createCourse(new Date(2023, 4, 12, 12, 0), new Date(2023, 4, 12, 12, 55), 5));
    lessons.push(createCourse(new Date(2023, 4, 13, 8, 30), new Date(2023, 4, 13, 10, 0), 5));
    lessons.push(createCourse(new Date(2023, 4, 15, 8, 30), new Date(2023, 4, 15, 10, 0), 5));
    lessons.push(createCourse(new Date(2023, 4, 18, 8, 30), new Date(2023, 4, 18, 10, 0), 5));

    lessons.push(createCourse(new Date(2023, 4, 5, 10, 0), new Date(2023, 4, 5, 11, 0), 6));
    lessons.push(createCourse(new Date(2023, 4, 7, 12, 0), new Date(2023, 4, 7, 12, 45), 6));
    lessons.push(createCourse(new Date(2023, 4, 9, 12, 0), new Date(2023, 4, 9, 12, 45), 6));
    lessons.push(createCourse(new Date(2023, 4, 11, 12, 0), new Date(2023, 4, 11, 12, 45), 6));
    lessons.push(createCourse(new Date(2023, 4, 12, 12, 0), new Date(2023, 4, 12, 12, 55), 6));
    lessons.push(createCourse(new Date(2023, 4, 13, 8, 30), new Date(2023, 4, 13, 10, 0), 6));

    lessons.push(createCourse(new Date(2023, 4, 15, 8, 30), new Date(2023, 4, 15, 10, 0), 7));
    lessons.push(createCourse(new Date(2023, 4, 18, 8, 30), new Date(2023, 4, 18, 10, 0), 7));
    return queryInterface.bulkInsert(TABLE_NAME, lessons);
  },

  down(queryInterface) {
    return queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};
