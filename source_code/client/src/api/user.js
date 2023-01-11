import { extractData } from './helpers';
import request from './request';

const urls = {
  root: '/users',
  get fetchAll() {
    return this.root;
  },
  fetchById(id) {
    return `${urls.root}/${id}`;
  },
  get fetchTrainers() {
    return this.root + '/trainers';
  },
  removeById(id) {
    return `${urls.root}/${id}`;
  },
};

const fetchAll = () => {
  return request.get(urls.fetchAll).then(extractData);
};

const fetchById = id => {
  return request.get(urls.fetchById(id)).then(extractData);
};

const fetchTrainers = () => {
  return request.get(urls.fetchTrainers).then(extractData);
};

const removeById = id => {
  return request.delete(urls.removeById(id));
};

export default {
  fetchAll,
  fetchById,
  fetchTrainers,
  removeById,
};
