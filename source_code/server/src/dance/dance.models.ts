import { IFields, IModels } from 'shared/database/types';
import { IDance } from './types';
import { Model } from 'sequelize';

class DanceModel extends Model implements IDance {
  id!: number;
  name!: string;
  description?: string;
  image?: string;
  videoLink?: string;

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
        allowNull: true,
      },
      image: {
        type: STRING,
        allowNull: true,
      },
      videoLink: {
        type: STRING,
        allowNull: true,
      },
    };
  }

  static associate({ EventDance }: IModels) {
    this.hasMany(EventDance, {
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
