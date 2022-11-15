import UserModel from 'user/user.model';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    export interface Request {
      user: typeof UserModel;
    }
  }
}
