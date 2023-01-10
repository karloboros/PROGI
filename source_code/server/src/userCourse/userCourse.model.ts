import { IFields, IModels } from 'shared/database/types';
import { ApprovalStatus } from 'club/types';
import { ICourse } from 'course/types';
import { IUserCourse } from './types';
import { Model } from 'sequelize';

class UserCourseModel extends Model implements IUserCourse {
  id!: number;
  status!: ApprovalStatus;
  userId!: number;
  courseId!: number;
  course?: ICourse;

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
      as: 'course',
    });
    this.belongsTo(User, {
      foreignKey: { name: 'userId', field: 'userId' },
      as: 'user',
    });
  }

  static scopes() {
    return {
      includeCourse: {
        include: ['course'],
      },
      includeUser: {
        include: ['user'],
      },
      approved: {
        where: { status: ApprovalStatus.Approved },
      },
      pending: {
        where: { status: ApprovalStatus.Pending },
      },
    };
  }

  static dbOptions() {
    return {
      modelName: 'userCourse',
      tableName: 'user_courses',
      timestamps: false,
    };
  }
}

export default UserCourseModel;
