import { IFields, IModels } from 'shared/database/types';
import { ApprovalStatus } from 'club/types';
import { IUserCourse } from './types';
import { Model } from 'sequelize';

class UserCourseModel extends Model implements IUserCourse {
  id!: number;
  status!: ApprovalStatus;
  userId!: number;
  courseId!: number;

  static fields({ INTEGER }: IFields) {
    return {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      status: {
        type: INTEGER,
        allowNull: false,
      },
      userId: {
        type: INTEGER,
        allowNull: false,
      },
      courseId: {
        type: INTEGER,
        allowNull: false,
      },
    };
  }

  static associate({ User, Course }: IModels) {
    this.belongsTo(Course, {
      foreignKey: { name: 'courseId', field: 'courseId' },
    });
    this.belongsTo(User, {
      foreignKey: { name: 'userId', field: 'userId' },
    });
  }

  static dbOptions() {
    return {
      modelName: 'userCourse',
      tableName: 'user_course',
      timestamps: false,
    };
  }
}

export default UserCourseModel;
