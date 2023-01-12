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
    userCourses.push(createUserCourse({ status: 1, userId: 15, courseId: 1 }));
    userCourses.push(createUserCourse({ status: 1, userId: 16, courseId: 1 }));
    userCourses.push(createUserCourse({ status: 1, userId: 17, courseId: 1 }));
    userCourses.push(createUserCourse({ status: 1, userId: 18, courseId: 1 }));
    userCourses.push(createUserCourse({ status: 1, userId: 19, courseId: 1 }));
    userCourses.push(createUserCourse({ status: 0, userId: 1, courseId: 1 }));
    userCourses.push(createUserCourse({ status: 2, userId: 2, courseId: 1 }));

    userCourses.push(createUserCourse({ status: 1, userId: 10, courseId: 2 }));
    userCourses.push(createUserCourse({ status: 1, userId: 21, courseId: 2 }));
    userCourses.push(createUserCourse({ status: 1, userId: 15, courseId: 2 }));
    userCourses.push(createUserCourse({ status: 1, userId: 16, courseId: 2 }));

    userCourses.push(createUserCourse({ status: 1, userId: 10, courseId: 3 }));
    userCourses.push(createUserCourse({ status: 1, userId: 21, courseId: 3 }));
    userCourses.push(createUserCourse({ status: 1, userId: 15, courseId: 3 }));
    userCourses.push(createUserCourse({ status: 1, userId: 16, courseId: 3 }));

    userCourses.push(createUserCourse({ status: 1, userId: 10, courseId: 4 }));
    userCourses.push(createUserCourse({ status: 1, userId: 21, courseId: 4 }));
    userCourses.push(createUserCourse({ status: 1, userId: 15, courseId: 4 }));
    userCourses.push(createUserCourse({ status: 1, userId: 16, courseId: 4 }));

    userCourses.push(createUserCourse({ status: 1, userId: 10, courseId: 5 }));
    userCourses.push(createUserCourse({ status: 1, userId: 21, courseId: 5 }));
    userCourses.push(createUserCourse({ status: 1, userId: 15, courseId: 5 }));
    userCourses.push(createUserCourse({ status: 1, userId: 16, courseId: 5 }));
    return queryInterface.bulkInsert(TABLE_NAME, userCourses);
  },
  down(queryInterface) {
    return queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};
