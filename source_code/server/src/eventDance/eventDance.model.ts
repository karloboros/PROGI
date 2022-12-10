import { IFields, IModels } from 'shared/database/types';
import { IDanceBall } from './types';
import { Model } from 'sequelize';

class DanceBallDanceModel extends Model implements IDanceBall {
  id!: number;
  danceId!: number;
  danceballId!: number;

  static fields({ INTEGER }: IFields) {
    return {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      danceId: {
        type: INTEGER,
        allowNull: false,
        unique: true,
      },
      danceballId: {
        type: INTEGER,
        allowNull: false,
        unique: true,
      },
    };
  }

  static associate({ Dance, BallDance }: IModels) {
    this.belongsTo(Dance, {
      foreignKey: { name: 'danceId', field: 'danceId' },
    });
    this.belongsTo(BallDance, {
      foreignKey: { name: 'eventId', field: 'eventId' },
    });
  }

  static dbOptions() {
    return {
      modelName: 'danceball',
      tableName: 'danceballs',
      timestamps: false,
    };
  }
}

export default DanceBallDanceModel;
