import { IFields, IModels } from 'shared/database/types';
import { IEvent } from './types';
import { Model } from 'sequelize';

class EventModel extends Model implements IEvent {
  id!: number;
  name!: string;
  description!: string;
  image!: string;
  startTime!: Date;
  clubId!: number;
  locationId!: number;

  static fields({ INTEGER, STRING, TEXT, DATE }: IFields) {
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
      startTime: {
        type: DATE,
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

  static associate({ Location, Club, EventDance, Dance }: IModels) {
    this.belongsTo(Club, {
      foreignKey: { name: 'clubId', field: 'clubId' },
    });
    this.belongsTo(Location, {
      foreignKey: { name: 'locationId', field: 'locationId' },
    });
    this.hasMany(EventDance, {
      foreignKey: { name: 'eventId', field: 'eventId' },
    });
    this.belongsToMany(Dance, { through: EventDance });
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
