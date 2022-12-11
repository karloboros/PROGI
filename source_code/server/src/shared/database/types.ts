import { DataType } from 'sequelize';

// eslint-disable-next-line sort-imports
import ClubModel from 'club/club.model';
import DanceModel from 'dance/dance.model';
import EventDanceModel from 'eventDance/eventDance.model';
import EventModel from 'event/event.model';
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
  Event: typeof EventModel;
  Club: typeof ClubModel;
  EventDance: typeof EventDanceModel;
  Dance: typeof DanceModel;
  Location: typeof LocationModel;
  User: typeof UserModel;
};

export { IFields, IModels };
