import { IFields, IModels } from 'shared/database/types';
import { IEventDance } from './types';
import { Model } from 'sequelize';

class EventDanceModel extends Model implements IEventDance {
  id!: number;
  danceId!: number;
  eventId!: number;

  static fields({ INTEGER }: IFields) {
    return {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      eventId: {
        type: INTEGER,
        allowNull: false,
      },
      danceId: {
        type: INTEGER,
        allowNull: false,
      },
    };
  }

  static associate({ Dance, Event }: IModels) {
    this.belongsTo(Event, {
      foreignKey: { name: 'eventId', field: 'eventId' },
    });
    this.belongsTo(Dance, {
      foreignKey: { name: 'danceId', field: 'danceId' },
    });
  }

  static dbOptions() {
    return {
      modelName: 'eventDance',
      tableName: 'event_dances',
      timestamps: false,
    };
  }
}

export default EventDanceModel;
