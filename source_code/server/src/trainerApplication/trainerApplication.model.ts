import { ApprovalStatus, IClub } from 'club/types';
import { IFields, IModels } from 'shared/database/types';
import { ITrainerApplication } from './types';
import { Model } from 'sequelize';

class TrainerApplicationModel extends Model implements ITrainerApplication {
  id!: number;
  motivationalLetter!: string;
  certificate!: string;
  status!: ApprovalStatus;
  trainerId!: number;
  clubId!: IClub;

  static fields({ INTEGER, STRING }: IFields) {
    return {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      motivationalLetter: {
        type: STRING,
        allowNull: false,
      },
      certificate: {
        type: STRING,
        allowNull: false,
      },
      status: {
        type: INTEGER,
        allowNull: false,
      },
      trainerId: {
        type: INTEGER,
        allowNull: false,
      },
      clubId: {
        type: INTEGER,
        allowNull: false,
      },
    };
  }

  static associate({ Club, User }: IModels) {
    this.belongsTo(User, {
      foreignKey: { name: 'ownerId', field: 'ownerId' },
    });
    this.belongsTo(Club, {
      foreignKey: { name: 'clubId', field: 'clubId' },
    });
  }

  static scopes() {
    return {
      includeOwner: {
        include: ['userId'],
      },
      includeClub: {
        include: ['clubId'],
      },
      pending: {
        where: { status: ApprovalStatus.Pending },
      },
    };
  }

  static dbOptions() {
    return {
      modelName: 'trainerApplication',
      tableName: 'trainerApplications',
      timestamps: false,
    };
  }
}

export default TrainerApplicationModel;
