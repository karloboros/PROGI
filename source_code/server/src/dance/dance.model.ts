import { IFields, IModels } from 'shared/database/types';
import { IDance } from './types';
import { Model } from 'sequelize';

class DanceModel extends Model implements IDance {
  id!: number;
  name!: string;
  description!: string;
  image!: string;
  videoUrl!: string;

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

  static associate({ Course, Event, EventDance }: IModels) {
    this.hasMany(Course, {
      foreignKey: { name: 'danceId', field: 'danceId' },
    });
    this.hasMany(EventDance, {
      foreignKey: { name: 'danceId', field: 'danceId' },
    });
    this.belongsToMany(Event, { through: EventDance });
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
