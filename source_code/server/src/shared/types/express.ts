import { IUser } from 'user/types';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    export interface Request {
      user: IUser;
    }
  }
}
