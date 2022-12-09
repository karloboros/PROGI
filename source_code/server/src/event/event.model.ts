import { IFields, IModels } from 'shared/database/types';
import { IBallDance } from './types';
import { Model } from 'sequelize';

class BallDanceModel extends Model implements IBallDance {
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
      locationId: {
        type: INTEGER,
        allowNull: false,
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
      },
      clubId: {
        type: INTEGER,
        allowNull: false,
      },
    };
  }

  static associate({ Club }: IModels) {
    this.hasMany(Club, {
      foreignKey: { name: 'locationId', field: 'locationId' },
    });
  }

  static associate({ Location, Club }: IModels) {
    this.belongsTo(Location, {
      foreignKey: { name: 'locationId', field: 'locationId' },
    });
    this.belongsTo(Club, {
      foreignKey: { name: 'clubId', field: 'clubId' },
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

export default BallDanceModel;
