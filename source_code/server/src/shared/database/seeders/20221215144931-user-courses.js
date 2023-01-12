const TABLE_NAME = 'user_courses';

const createUserCourse = ({ status, userId, courseId }) => {
  return {
    status,
    userId,
    courseId,
  };
};

module.exports = {
  up(queryInterface) {
    const userCourses = [];
    userCourses.push(createUserCourse({ status: 0, userId: 1, courseId: 1 }));
    userCourses.push(createUserCourse({ status: 0, userId: 2, courseId: 2 }));
    userCourses.push(createUserCourse({ status: 0, userId: 3, courseId: 3 }));
    userCourses.push(createUserCourse({ status: 1, userId: 2, courseId: 1 }));
    userCourses.push(createUserCourse({ status: 1, userId: 4, courseId: 2 }));
    userCourses.push(createUserCourse({ status: 1, userId: 6, courseId: 3 }));
    userCourses.push(createUserCourse({ status: 2, userId: 3, courseId: 2 }));
    userCourses.push(createUserCourse({ status: 2, userId: 5, courseId: 3 }));
    return queryInterface.bulkInsert(TABLE_NAME, userCourses);
  },
  down(queryInterface) {
    return queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};
