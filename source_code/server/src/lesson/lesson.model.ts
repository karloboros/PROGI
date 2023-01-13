import { IFields, IModels } from 'shared/database/types';
import { ILesson } from './types';
import { Model } from 'sequelize';

class LessonModel extends Model implements ILesson {
  id!: number;
  startTime!: Date;
  endTime!: Date;
  courseId!: number;

  static fields({ INTEGER, DATE }: IFields) {
    return {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      startTime: {
        type: DATE,
        allowNull: false,
      },
      endTime: {
        type: DATE,
        allowNull: false,
      },
      courseId: {
        type: INTEGER,
        allowNull: false,
      },
    };
  }

  static associate({ Course }: IModels) {
    this.belongsTo(Course, {
      foreignKey: { name: 'courseId', field: 'courseId' },
    });
  }

  static scopes() {
    return {
      includeCourse: {
        include: ['course'],
      },
    };
  }

  static dbOptions() {
    return {
      modelName: 'lesson',
      tableName: 'lessons',
      timestamps: false,
    };
  }
}

export default LessonModel;
