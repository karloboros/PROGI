import { IFields, IModels } from 'shared/database/types';
import { IDance } from './types';
import { IEvent } from 'event/types';
import { Model } from 'sequelize';

class DanceModel extends Model implements IDance {
  id!: number;
  name!: string;
  description!: string;
  image!: string;
  videoUrl!: string;
  events?: IEvent[];

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

  static associate({ EventDance, Event }: IModels) {
    this.hasMany(EventDance, {
      foreignKey: { name: 'danceId', field: 'danceId' },
    });
    this.belongsToMany(Event, { through: EventDance });
  }

  static scopes() {
    return {
      includeDance: {
        include: ['eventDance'],
      },
    };
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
