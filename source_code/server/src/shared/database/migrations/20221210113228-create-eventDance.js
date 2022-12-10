const TABLE_NAME = 'eventDances';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable(TABLE_NAME, {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      danceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      danceballId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable(TABLE_NAME);
  },
};
