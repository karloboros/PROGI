import { Attributes, DataTypes, Model, ModelStatic, Sequelize } from 'sequelize';
import { forEach, invoke } from 'lodash';
import { Hooks } from 'sequelize/types/hooks';
import { IModels } from './types';

const sequelize = new Sequelize(
  process.env.POSTGRES_DB || '',
  process.env.POSTGRES_USER || '',
  process.env.POSTGRES_PASSWORD || '',
  {
    dialect: 'postgres',
    host: process.env.POSTGRES_HOST,
  },
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function defineModel(Model: any) {
  const fields = invoke(Model, 'fields', DataTypes, sequelize) || {};
  const dbOptions = invoke(Model, 'dbOptions', sequelize) || {};
  Object.assign(dbOptions, { sequelize });
  return Model.init(fields, dbOptions);
}

forEach(models, model => {
  invoke(model, 'associate', models);
  addHooks(model, models);
  addScopes(model);
});

function addHooks(model: ModelStatic<Model>, models: IModels) {
  const hooks = invoke(model, 'hooks', models);
  forEach(hooks, (hook, type) => model.addHook(type as Attributes<Hooks>, hook));
}

function addScopes(model: ModelStatic<Model>) {
  const scopes = invoke(model, 'scopes', models);
  forEach(scopes, (scope, name) => model.addScope(name, scope, { override: true }));
}

const { User } = models;
export { User };

export default sequelize;
