import { extractData } from './helpers';
import request from './request';

const urls = {
  root: '/lessons',
  fetchAll(courseId) {
    return `${urls.root}/${courseId}`;
  },
  fetchById(id) {
    return `${urls.root}/one/${id}`;
  },
  get create() {
    return this.root + '/create';
  },
  edit(id) {
    return `${urls.root}/edit/${id}`;
  },
  remove(id) {
    return `${urls.root}/remove/${id}`;
  },
};

const fetchAll = courseId => {
  return request.get(urls.fetchAll(courseId)).then(extractData);
};

const fetchById = id => {
  return request.get(urls.fetchById(id)).then(extractData);
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
  create,
  edit,
  remove,
};
