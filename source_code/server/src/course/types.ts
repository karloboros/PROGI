import { Gender } from 'user/types';
import { IDance } from 'dance/types';
import { ILesson } from 'lesson/types';

interface ICourse {
  id: number;
  name: string;
  description: string;
  capacity: number;
  minAge?: number;
  maxAge?: number;
  gender?: Gender;
  applicationDeadline: Date;
  additionalRules?: string;
  clubId: number;
  danceId: number;
  locationId: number;
  trainerId: number;
  lessons?: ILesson[];
  dance?: IDance;
}

export { ICourse };
