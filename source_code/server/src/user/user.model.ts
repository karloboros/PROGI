import { Gender, IUser, Role } from './types';
import bcrypt from 'bcrypt';
import { IFields } from 'shared/database/types';
import { Model } from 'sequelize';

class UserModel extends Model implements IUser {
  id!: number;
  username!: string;
  firstName!: string;
  lastName!: string;
  fullName!: string;
  password!: string;
  gender!: Gender;
  dateOfBirth!: Date;
  phone!: string;
  email!: string;
  role!: Role;
  experienceDescription?: string | undefined;
  refreshToken!: string;

  static fields({ INTEGER, STRING, DATE, VIRTUAL }: IFields) {
    return {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: STRING,
        allowNull: false,
        unique: true,
      },
      firstName: {
        type: STRING,
        allowNull: false,
      },
      lastName: {
        type: STRING,
        allowNull: false,
      },
      fullName: {
        type: VIRTUAL,
        get(this: IUser) {
          return `${this.firstName} ${this.lastName}`.trim();
        },
      },
      password: {
        type: STRING,
        allowNull: false,
      },
      gender: {
        type: INTEGER,
        allowNull: false,
      },
      dateOfBirth: {
        type: DATE,
        allowNull: false,
      },
      phone: {
        type: STRING,
        allowNull: false,
      },
      email: {
        type: STRING,
        allowNull: false,
      },
      role: {
        type: INTEGER,
        allowNull: false,
      },
      experienceDescription: {
        type: STRING,
        allowNull: true,
      },
      refreshToken: {
        type: STRING,
        allowNull: true,
      },
    };
  }

  get profile() {
    return {
      id: this.id,
      username: this.username,
      fullName: this.fullName,
      gender: this.gender,
      dateOfBirth: this.dateOfBirth,
      phone: this.phone,
      email: this.email,
      role: this.role,
      experienceDescription: this.experienceDescription,
    };
  }

  static scopes() {
    return {
      defaultScope: {
        attributes: { exclude: ['password'] },
      },
    };
  }

  static dbOptions() {
    return {
      modelName: 'user',
      tableName: 'users',
      timestamps: false,
    };
  }

  static hooks() {
    return {
      beforeCreate(user: User) {
        return user._hashPassword();
      },
    };
  }

  private async _hashPassword() {
    const saltRounds = Number(process.env.SALT_ROUNDS as string);
    const hash = await bcrypt.hash(this.password, saltRounds);
    this.password = hash;
  }
}

export default UserModel;
