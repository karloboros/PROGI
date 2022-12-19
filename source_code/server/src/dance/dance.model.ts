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

  get profile() {
    return {
      id: this.id,
      name: this.name,
      videoUrl: this.videoUrl,
      image: this.image,
      description: this.description,
    };
  }

  static associate({ EventDance }: IModels) {
    this.hasMany(EventDance, {
      foreignKey: { name: 'danceId', field: 'danceId' },
    });
  }

  static scopes() {
    return {
      includeEventDance: {
        include: ['event_dances'],
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
