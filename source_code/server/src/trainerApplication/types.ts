import { ApprovalStatus } from 'club/types';

interface ITrainerApplication {
  id: number;
  motivationalLetter: string;
  certificate: string;
  status: ApprovalStatus;
  trainerId: number;
  clubId: number;
}

export { ITrainerApplication };
