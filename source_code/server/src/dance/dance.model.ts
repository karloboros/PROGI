import { IFields, IModels } from 'shared/database/types';
import { IDance } from './types';
import { Model } from 'sequelize';

class DanceModel extends Model implements IDance {
  id!: number;
  name!: string;
  description: string;
  image: string;
  videoLink: string;

  static fields({ INTEGER, STRING, TEXT }: IFields) {
    return {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: TEXT,
        allowNull: false,
      },
      image: {
        type: STRING,
        allowNull: false,
      },
      videoUrl: {
        type: STRING,
        allowNull: false,
      },
    };
  }

  static associate({ DanceBallDance }: IModels) {
    this.hasMany(DanceBallDance, {
      foreignKey: { name: 'danceId', field: 'danceId' },
    });
  }

  static dbOptions() {
    return {
      modelName: 'dance',
      tableName: 'dances',
      timestamps: false,
    };
  }
}

export default DanceModel;
