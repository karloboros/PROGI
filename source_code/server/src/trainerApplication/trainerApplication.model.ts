import { IFields, IModels } from 'shared/database/types';
import { ApprovalStatus } from 'club/types';
import { ITrainerApplication } from './types';
import { Model } from 'sequelize';

class TrainerApplicationModel extends Model implements ITrainerApplication {
  id!: number;
  motivationalLetter!: string;
  certificate!: string;
  status!: ApprovalStatus;
  trainerId!: number;
  clubId!: number;

  static fields({ INTEGER, STRING, TEXT }: IFields) {
    return {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      motivationalLetter: {
        type: TEXT,
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
    this.belongsTo(Club, {
      foreignKey: { name: 'clubId', field: 'clubId' },
    });
    this.belongsTo(User, {
      foreignKey: { name: 'trainerId', field: 'trainerId' },
    });
  }

  static scopes() {
    return {
      includeTrainer: {
        include: ['trainer'],
      },
      includeClub: {
        include: ['club'],
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
      modelName: 'trainerApplication',
      tableName: 'trainer_applications',
      timestamps: false,
    };
  }
}

export default TrainerApplicationModel;
