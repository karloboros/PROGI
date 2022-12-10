import { Gender } from 'user/types';

interface ICourse {
  id: number;
  name: string;
  description: string;
  image?: string;
  capacity: number;
  minAge?: number;
  maxAge?: number;
  gender?: Gender;
  applicationDeadline: Date;
  maxApplicants?: number;
  additionalRules?: string;
  clubId: number;
  danceId: number;
  locationId: number;
  trainerId: number;
}

export { ICourse };
