const TABLE_NAME = 'locations';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable(TABLE_NAME, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      coordinates: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
  },
  down(queryInterface) {
    return queryInterface.dropTable(TABLE_NAME);
  },
};
