import { DataType } from 'sequelize';

// eslint-disable-next-line sort-imports
import ClubModel from 'club/club.model';
import CourseModel from 'course/course.model';
import LessonModel from 'lesson/lesson.model';
import LocationModel from 'location/location.model';
import UserModel from 'user/user.model';

interface IFields {
  DATE?: DataType;
  INTEGER?: DataType;
  STRING?: DataType;
  TEXT?: DataType;
  VIRTUAL?: DataType;
  DECIMAL?: DataType;
}

type IModels = {
  Club: typeof ClubModel;
  Course: typeof CourseModel;
  Lesson: typeof LessonModel;
  Location: typeof LocationModel;
  User: typeof UserModel;
};

export { IFields, IModels };
