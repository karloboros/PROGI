const TABLE_NAME = 'trainerApplications';

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
        type: Sequelize.STRING,
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
        unique: true,
      },
      clubId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  down(queryInterface) {
    return queryInterface.dropTable(TABLE_NAME);
  },
};
