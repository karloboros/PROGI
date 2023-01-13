const TABLE = 'events';
const FIELD = 'startTime';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn(TABLE, FIELD, {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },

  down(queryInterface) {
    return queryInterface.removeColumn(TABLE, FIELD);
  },
};
