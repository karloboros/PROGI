import { ApprovalStatus } from 'club/types';

interface IUserCourse {
  id: number;
  status: ApprovalStatus;
  userId: number;
  courseId: number;
}

export { IUserCourse };
