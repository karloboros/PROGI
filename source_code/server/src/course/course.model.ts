import { IFields, IModels } from 'shared/database/types';
import { Gender } from 'user/types';
import { ICourse } from './types';
import { IDance } from 'dance/types';
import { ILesson } from 'lesson/types';
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
  lessons?: ILesson[];
  dance?: IDance;

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

  get isApplicationActive() {
    const { lessons, applicationDeadline } = this;
    return !!lessons?.length && new Date() < new Date(applicationDeadline);
  }

  get isActive() {
    const { lessons } = this;
    return !!lessons?.length;
  }

  static associate({ Club, Dance, Lesson, Location, User, UserCourse }: IModels) {
    this.hasMany(Lesson, {
      foreignKey: { name: 'courseId', field: 'courseId' },
    });
    this.hasMany(UserCourse, {
      foreignKey: { name: 'courseId', field: 'courseId' },
    });
    this.belongsTo(Club, {
      foreignKey: { name: 'clubId', field: 'clubId' },
    });
    this.belongsTo(Dance, {
      foreignKey: { name: 'danceId', field: 'danceId' },
    });
    this.belongsTo(Location, {
      foreignKey: { name: 'locationId', field: 'locationId' },
    });
    this.belongsTo(User, {
      foreignKey: { name: 'trainerId', field: 'trainerId' },
      as: 'trainer',
    });
  }

  static scopes() {
    return {
      includeLessons: {
        include: ['lessons'],
      },
      includeLocation: {
        include: ['location'],
      },
      includeClub: {
        include: ['club'],
      },
      includeTrainer: {
        include: ['trainer'],
      },
      includeDance: {
        include: ['dance'],
      },
    };
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
