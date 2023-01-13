import { IClub } from 'club/types';

enum Gender {
  Female,
  Male,
}

enum Role {
  Administrator,
  ClubOwner,
  Trainer,
  User,
}

interface IUser {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  gender: Gender;
  dateOfBirth: Date;
  phone: string;
  email: string;
  role: Role;
  experienceDescription?: string;
  image?: string;
  refreshToken?: string;
  clubs?: IClub[];
}

type ITokenType = 'ACCESS' | 'REFRESH';

export { Role, Gender, IUser, ITokenType };
