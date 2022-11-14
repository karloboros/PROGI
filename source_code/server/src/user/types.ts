enum Gender {
  Female,
  Male,
}

enum Role {
  Administrator,
  ClubOwner,
  Coach,
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
  refreshToken: string;
}

type ITokenType = 'ACCESS' | 'REFRESH';

export { Role, Gender, IUser, ITokenType };
