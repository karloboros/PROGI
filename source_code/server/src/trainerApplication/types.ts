import { ApprovalStatus } from 'club/types';
import { IUser } from 'user/types';

interface ITrainerApplication {
  id: number;
  motivationalLetter: string;
  certificate: string;
  status: ApprovalStatus;
  trainerId: number;
  clubId: number;
  trainer?: IUser;
}

export { ITrainerApplication };
