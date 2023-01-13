import { ICourse } from 'course/types';
import { IEvent } from 'event/types';
import { ILocation } from 'location/types';

enum ApprovalStatus {
  Pending,
  Approved,
  Rejected,
}

interface IClub {
  id: number;
  name: string;
  phone: string;
  email: string;
  approvalStatus: ApprovalStatus;
  description?: string;
  ownerId: number;
  locationId: number;
  courses?: ICourse[];
  events?: IEvent[];
  location?: ILocation;
}

type DanceParamType = 'danceId' | 'name';

export { ApprovalStatus, IClub, DanceParamType };
