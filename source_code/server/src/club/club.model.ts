import { ApprovalStatus, IClub } from './types';
import { IFields, IModels } from 'shared/database/types';
import DanceModel from 'dance/dance.model';
import EventModel from 'event/event.model';
import { ICourse } from 'course/types';
import { IEvent } from 'event/types';
import { ILocation } from 'location/types';
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
  events?: IEvent[];
  location?: ILocation;

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

  static associate({ Course, Event, Location, User, TrainerApplication }: IModels) {
    this.hasMany(Course, {
      foreignKey: { name: 'clubId', field: 'clubId' },
    });
    this.hasMany(Event, {
      foreignKey: { name: 'clubId', field: 'clubId' },
    });
    this.hasMany(TrainerApplication, {
      foreignKey: { name: 'clubId', field: 'clubId' },
    });
    this.belongsTo(Location, {
      foreignKey: { name: 'locationId', field: 'locationId' },
    });
    this.belongsTo(User, {
      foreignKey: { name: 'ownerId', field: 'ownerId' },
      as: 'owner',
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
      includeCourses: {
        include: ['courses'],
      },
      includeEvents: {
        include: [{ model: EventModel, include: [DanceModel] }],
      },
      approved: {
        where: { approvalStatus: ApprovalStatus.Approved },
      },
      pending: {
        where: { approvalStatus: ApprovalStatus.Pending },
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

  getDanceIds() {
    const { courses, events } = this;
    const danceIds: number[] = [];
    const pushIfNew = (danceId: number) => danceIds.indexOf(danceId) === -1 && danceIds.push(danceId);
    courses?.forEach(({ danceId }) => pushIfNew(danceId));
    events?.forEach(({ dances }) => {
      dances?.forEach(({ id: danceId }) => pushIfNew(danceId));
    });
    return danceIds;
  }

  getDanceNames() {
    const { courses, events } = this;
    const danceNames: string[] = [];
    const pushIfNew = (danceName: string) => danceNames.indexOf(danceName) === -1 && danceNames.push(danceName);
    courses?.forEach(({ name }) => pushIfNew(name));
    events?.forEach(({ dances }) => {
      dances?.forEach(({ name }) => pushIfNew(name));
    });
    return danceNames;
  }
}

export default ClubModel;
