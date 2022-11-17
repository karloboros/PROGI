import { IFields, IModels } from 'shared/database/types';
import { ILocation } from './types';
import { Model } from 'sequelize';

class LocationModel extends Model implements ILocation {
  id!: number;
  name!: string;
  coordinates?: string;

  static fields({ INTEGER, STRING }: IFields) {
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
      coordinates: {
        type: STRING,
        allowNull: true,
      },
    };
  }

  static associate({ Club }: IModels) {
    this.hasMany(Club, {
      foreignKey: { name: 'locationId', field: 'locationId' },
    });
  }

  static dbOptions() {
    return {
      modelName: 'location',
      tableName: 'locations',
      timestamps: false,
    };
  }
}

export default LocationModel;
