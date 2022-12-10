const TABLE_NAME = 'courses';
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable(TABLE_NAME, {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      minAge: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      maxAge: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      gender: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      applicationDeadline: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      maxApplicants: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      additionalRules: {
        type: Sequelize.TEXT,
        allowNull: true,
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
      danceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      locationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'locations',
          },
          key: 'id',
        },
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
    });
  },
  down(queryInterface) {
    return queryInterface.dropTable(TABLE_NAME);
  },
};
