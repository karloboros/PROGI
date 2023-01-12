import { IDance } from 'dance/types';

interface IEvent {
  id: number;
  name: string;
  description: string;
  image: string;
  startTime: Date;
  clubId: number;
  locationId: number;
  dances?: IDance[];
}

export { IEvent };
