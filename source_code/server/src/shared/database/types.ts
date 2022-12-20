import { DataType } from 'sequelize';

// eslint-disable-next-line sort-imports
import BallDanceModel from 'event/event.model';
import ClubModel from 'club/club.model';
import CourseModel from 'course/course.model';
import DanceBallDanceModel from 'eventDance/eventDance.model';
import DanceModel from 'dance/dance.model';
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
  BallDance: typeof BallDanceModel;
  Club: typeof ClubModel;
  Course: typeof CourseModel;
  DanceBallDance: typeof DanceBallDanceModel;
  Dance: typeof DanceModel;
  Lesson: typeof LessonModel;
  Location: typeof LocationModel;
  User: typeof UserModel;
};

export { IFields, IModels };
