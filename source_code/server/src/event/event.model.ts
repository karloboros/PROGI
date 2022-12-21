import { IFields, IModels } from 'shared/database/types';
import { IEvent } from './types';
import { Model } from 'sequelize';

class EventModel extends Model implements IEvent {
  id!: number;
  name!: string;
  description!: string;
  image!: string;
  clubId!: number;
  locationId!: number;

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
      },
      description: {
        type: TEXT,
        allowNull: false,
      },
      image: {
        type: STRING,
        allowNull: false,
      },
      clubId: {
        type: INTEGER,
        allowNull: false,
      },
      locationId: {
        type: INTEGER,
        allowNull: false,
      },
    };
  }

  static associate({ Location, Club, EventDance }: IModels) {
    this.belongsTo(Club, {
      foreignKey: { name: 'clubId', field: 'clubId' },
    });
    this.belongsTo(Location, {
      foreignKey: { name: 'locationId', field: 'locationId' },
    });
    this.hasMany(EventDance, {
      foreignKey: { name: 'eventId', field: 'eventId' },
    });
  }

  static dbOptions() {
    return {
      modelName: 'event',
      tableName: 'events',
      timestamps: false,
    };
  }
}

export default EventModel;