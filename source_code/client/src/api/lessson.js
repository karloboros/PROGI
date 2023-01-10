import { extractData } from './helpers';
import request from './request';

const urls = {
  root: '/lessons',
  fetchByCourseId(courseId) {
    return `${urls.root}/course/${courseId}`;
  },
  fetchById(id) {
    return `${urls.root}/${id}`;
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

const fetchByCourseId = courseId => {
  return request.get(urls.fetchByCourseId(courseId)).then(extractData);
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
  fetchByCourseId,
  fetchById,
  create,
  edit,
  remove,
};
