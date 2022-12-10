import { DataType } from 'sequelize';

// eslint-disable-next-line sort-imports
import BallDanceModel from 'event/event.model';
import ClubModel from 'club/club.model';
import DanceBallDanceModel from 'eventDance/eventDance.model';
import DanceModel from 'dance/dance.models';
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
  Location: typeof LocationModel;
  User: typeof UserModel;
  BallDance: typeof BallDanceModel;
  Dance: typeof DanceModel;
  DanceBallDance: typeof DanceBallDanceModel;
};

export { IFields, IModels };
