import * as dotenv from 'dotenv';
import { Gender, ITokenType, IUser, Role } from './types';
import { IFields, IModels } from 'shared/database/types';
import authTokens from 'shared/auth/authTokens';
import bcrypt from 'bcrypt';
import { IClub } from 'club/types';
import jwt from 'jsonwebtoken';
import { Model } from 'sequelize';

dotenv.config();

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
  experienceDescription?: string;
  image?: string;
  refreshToken?: string;
  clubs?: IClub[];

  static fields({ INTEGER, STRING, TEXT, DATE, VIRTUAL }: IFields) {
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
        unique: true,
      },
      email: {
        type: STRING,
        allowNull: false,
        unique: true,
      },
      role: {
        type: INTEGER,
        allowNull: false,
      },
      experienceDescription: {
        type: TEXT,
        allowNull: true,
      },
      image: {
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
      firstName: this.firstName,
      lastName: this.lastName,
      fullName: this.fullName,
      gender: this.gender,
      dateOfBirth: this.dateOfBirth,
      phone: this.phone,
      email: this.email,
      role: this.role,
      experienceDescription: this.experienceDescription,
    };
  }

  static associate({ Club, TrainerApplication }: IModels) {
    this.hasMany(Club, {
      foreignKey: { name: 'ownerId', field: 'ownerId' },
    });
    this.hasMany(TrainerApplication, {
      foreignKey: { name: 'trainerId', field: 'trainerId' },
    });
  }

  static scopes() {
    return {
      defaultScope: {
        attributes: { exclude: ['password'] },
      },
      includeClub: {
        include: ['clubs'],
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
      beforeCreate(user: UserModel) {
        return user._hashPassword();
      },
    };
  }

  passwordCompare(password: string) {
    return bcrypt.compare(password, this.password);
  }

  async generateTokens() {
    const accessToken = this._generateToken(authTokens.type.ACCESS);
    const refreshToken = this._generateToken(authTokens.type.REFRESH);

    this.refreshToken = refreshToken;
    await this.save();

    return { accessToken, refreshToken };
  }

  private async _hashPassword() {
    const saltRounds = Number(process.env.SALT_ROUNDS as string);
    const hash = await bcrypt.hash(this.password, saltRounds);
    this.password = hash;
  }

  private _generateToken(tokenType: ITokenType) {
    const { id, username } = this;
    const payload = { id, username };
    const secret = authTokens.config[tokenType].secret;
    const options = {
      audience: authTokens.config[tokenType].audience,
      expiresIn: authTokens.config[tokenType].duration,
    };

    return jwt.sign(payload, secret, options);
  }
}

export default UserModel;
