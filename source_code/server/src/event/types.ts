import { IDance } from 'dance/types';

interface IEvent {
  id: number;
  name: string;
  description: string;
  image: string;
  clubId: number;
  locationId: number;
  dances?: IDance[];
}

export { IEvent };
