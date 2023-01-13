import { ApprovalStatus } from 'club/types';
import { ICourse } from 'course/types';

interface IUserCourse {
  id: number;
  status: ApprovalStatus;
  userId: number;
  courseId: number;
  course?: ICourse;
}

export { IUserCourse };
