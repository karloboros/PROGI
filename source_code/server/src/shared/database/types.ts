import { DataType } from 'sequelize';

// eslint-disable-next-line sort-imports
import ClubModel from 'club/club.model';
import CourseModel from 'course/course.model';
import DanceModel from 'dance/dance.model';
import EventDanceModel from 'eventDance/eventDance.model';
import EventModel from 'event/event.model';
import LocationModel from 'location/location.model';
import TrainerApplicationModel from 'trainerApplication/trainerApplication.model';
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
  Dance: typeof DanceModel;
  EventDance: typeof EventDanceModel;
  Event: typeof EventModel;
  Location: typeof LocationModel;
  TrainerApplication: typeof TrainerApplicationModel;
  User: typeof UserModel;
};

export { IFields, IModels };
