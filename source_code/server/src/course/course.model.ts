import { IFields, IModels } from 'shared/database/types';
import { Gender } from 'user/types';
import { ICourse } from './types';
import { Model } from 'sequelize';

class CourseModel extends Model implements ICourse {
  id!: number;
  name!: string;
  description!: string;
  image?: string;
  capacity!: number;
  minAge?: number;
  maxAge?: number;
  gender?: Gender;
  applicationDeadline!: Date;
  maxApplicants?: number;
  additionalRules?: string;
  clubId!: number;
  danceId!: number;
  locationId!: number;
  trainerId!: number;

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
        unique: false,
      },
      description: {
        type: TEXT,
        allowNull: false,
      },
      image: {
        type: STRING,
        allowNull: true,
      },
      capacity: {
        type: INTEGER,
        allowNull: false,
      },
      minAge: {
        type: INTEGER,
        allowNull: true,
      },
      maxAge: {
        type: INTEGER,
        allowNull: true,
      },
      gender: {
        type: INTEGER,
        allowNull: true,
      },
      applicationDeadline: {
        type: DATE,
        allowNull: false,
      },
      maxApplicants: {
        type: INTEGER,
        allowNull: true,
      },
      additionalRules: {
        type: TEXT,
        allowNull: true,
      },
      clubId: {
        type: INTEGER,
        allowNull: false,
      },
      danceId: {
        type: INTEGER,
        allowNull: false,
      },
      locationId: {
        type: INTEGER,
        allowNull: false,
      },
      trainerId: {
        type: INTEGER,
        allowNull: false,
      },
    };
  }

  static associate({ Location, User, Club }: IModels) {
    this.belongsTo(Location, {
      foreignKey: { name: 'locationId', field: 'locationId' },
    });
    this.belongsTo(User, {
      foreignKey: { name: 'trainerId', field: 'trainerId' },
      as: 'trainer',
    });
    this.belongsTo(Club, {
      foreignKey: { name: 'clubId', field: 'clubId' },
      as: 'club',
    });
  }

  static dbOptions() {
    return {
      modelName: 'course',
      tableName: 'courses',
      timestamps: false,
    };
  }
}

export default CourseModel;
