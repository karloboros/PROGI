const TABLE_NAME = 'event_dances';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable(TABLE_NAME, {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      eventId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'events',
          },
          key: 'id',
        },
      },
      danceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'dances',
          },
          key: 'id',
        },
      },
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable(TABLE_NAME);
  },
};
