import { IFields, IModels } from 'shared/database/types';
import { Gender } from 'user/types';
import { ICourse } from './types';
import { Model } from 'sequelize';

class CourseModel extends Model implements ICourse {
  id!: number;
  name!: string;
  description!: string;
  capacity!: number;
  minAge?: number;
  maxAge?: number;
  gender?: Gender;
  applicationDeadline!: Date;
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

  static associate({ Club, Lesson, Location, User }: IModels) {
    this.belongsTo(Club, {
      foreignKey: { name: 'clubId', field: 'clubId' },
    });
    this.hasMany(Lesson, {
      foreignKey: { name: 'courseId', field: 'courseId' },
    });
    this.belongsTo(Location, {
      foreignKey: { name: 'locationId', field: 'locationId' },
    });
    this.belongsTo(User, {
      foreignKey: { name: 'trainerId', field: 'trainerId' },
      as: 'trainer',
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
