const TABLE_NAME = 'trainer_applications';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable(TABLE_NAME, {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      motivationalLetter: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      certificate: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      trainerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id',
        },
      },
      clubId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'clubs',
          },
          key: 'id',
        },
      },
    });
  },

  down(queryInterface) {
    return queryInterface.dropTable(TABLE_NAME);
  },
};
