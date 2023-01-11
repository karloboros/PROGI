import { extractData } from './helpers';
import request from './request';

const urls = {
  root: '/courses',
  get fetchAll() {
    return this.root;
  },
  fetchById(id) {
    return `${urls.root}/${id}`;
  },
  fetchByClub(clubId) {
    return `${urls.root}/club/${clubId}`;
  },
  fetchByTrainer(trainerId) {
    return `${urls.root}/trainer/${trainerId}`;
  },
  get create() {
    return this.root + '/create';
  },
  edit(id) {
    return `${urls.root}/edit/${id}`;
  },
  remove(id) {
    return `${urls.root}/${id}`;
  },
};

const fetchAll = () => {
  return request.get(urls.fetchAll).then(extractData);
};

const fetchById = id => {
  return request.get(urls.fetchById(id)).then(extractData);
};

const fetchByClub = clubId => {
  return request.get(urls.fetchByClub(clubId)).then(extractData);
};

const fetchByTrainer = trainerId => {
  return request.get(urls.fetchByTrainer(trainerId)).then(extractData);
};

const create = (params = {}) => {
  return request.post(urls.create, params).then(extractData);
};

const edit = (params = {}) => {
  return request.post(urls.edit(params.id), params).then(extractData);
};

const remove = id => {
  return request.delete(urls.remove(id));
};

export default {
  fetchAll,
  fetchById,
  fetchByClub,
  fetchByTrainer,
  create,
  edit,
  remove,
};
