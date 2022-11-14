import { DataType } from 'sequelize';
import User from 'user/user.model';

interface IFields {
  DATE?: DataType;
  INTEGER?: DataType;
  STRING?: DataType;
  TEXT?: DataType;
  VIRTUAL?: DataType;
  DECIMAL?: DataType;
}

type IModels = {
  User: typeof User;
};

export { IFields, IModels };
