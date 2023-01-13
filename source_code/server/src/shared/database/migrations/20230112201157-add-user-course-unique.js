const TABLE_NAME = 'user_courses';
const CONSTRAINT_NAME = 'unique_user_course';

module.exports = {
  up(queryInterface) {
    return queryInterface.addConstraint(TABLE_NAME, {
      name: CONSTRAINT_NAME,
      allowNull: false,
      type: 'UNIQUE',
      fields: ['userId', 'courseId'],
    });
  },

  down(queryInterface) {
    return queryInterface.removeConstraint(TABLE_NAME, CONSTRAINT_NAME);
  },
};
