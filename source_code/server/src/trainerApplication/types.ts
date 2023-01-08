import { ApprovalStatus, IClub } from 'club/types';

interface ITrainerApplication {
  id: number;
  motivationalLetter: string;
  certificate: string;
  status: ApprovalStatus;
  trainerId: number;
  clubId: number;
  club?: IClub;
}

export { ITrainerApplication };
