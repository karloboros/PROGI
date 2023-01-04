import { ApprovalStatus, IClub } from './types';
import { IFields, IModels } from 'shared/database/types';
import { ICourse } from 'course/types';
import { Model } from 'sequelize';

class ClubModel extends Model implements IClub {
  id!: number;
  name!: string;
  phone!: string;
  email!: string;
  description?: string;
  approvalStatus!: ApprovalStatus;
  ownerId!: number;
  locationId!: number;
  courses?: ICourse[];

  static fields({ INTEGER, STRING, TEXT }: IFields) {
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
      phone: {
        type: STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: STRING,
        allowNull: false,
        unique: true,
      },
      approvalStatus: {
        type: INTEGER,
        allowNull: false,
      },
      description: {
        type: TEXT,
        allowNull: true,
      },
      ownerId: {
        type: INTEGER,
        allowNull: false,
      },
      locationId: {
        type: INTEGER,
        allowNull: false,
      },
    };
  }

  static associate({ Course, Location, User, TrainerApplication }: IModels) {
    this.hasMany(Course, {
      foreignKey: { name: 'clubId', field: 'clubId' },
    });
    this.belongsTo(Location, {
      foreignKey: { name: 'locationId', field: 'locationId' },
    });
    this.belongsTo(User, {
      foreignKey: { name: 'ownerId', field: 'ownerId' },
      as: 'owner',
    });
    this.hasMany(TrainerApplication, {
      foreignKey: { name: 'clubId', field: 'clubId' },
    });
  }

  static scopes() {
    return {
      includeOwner: {
        include: ['owner'],
      },
      includeLocation: {
        include: ['location'],
      },
      pending: {
        where: { approvalStatus: ApprovalStatus.Pending },
      },
      includeCourses: {
        include: ['courses'],
      },
    };
  }

  static dbOptions() {
    return {
      modelName: 'club',
      tableName: 'clubs',
      timestamps: false,
    };
  }
}

export default ClubModel;
