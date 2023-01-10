import { IEvent } from 'event/types';
interface IDance {
  id: number;
  name: string;
  description: string;
  image: string;
  videoUrl: string;
  clubs?: IEvent[];
}

export { IDance };
