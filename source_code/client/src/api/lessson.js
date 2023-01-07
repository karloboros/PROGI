import { extractData } from './helpers';
import request from './request';

const urls = {
  root: '/lessons',
  fetchAll(courseId) {
    return `${urls.root}/${courseId}`;
  },
  get fetchById() {
    return this.root;
  },
  get create() {
    return this.root + '/create';
  },
  get edit() {
    return this.root + '/edit';
  },
  get remove() {
    return this.root + '/remove';
  },
};

const fetchAll = courseId => {
  return request.get(urls.fetchAll(courseId)).then(extractData);
};
const fetchByClub = clubId => {
  return request.get(urls.fetchByClub + `/${clubId}`, clubId).then(extractData);
};

const create = (params = {}) => {
  return request.post(urls.create, params).then(extractData);
};

const remove = id => {
  return request.delete(urls.remove + `/${id}`);
};

export default { fetchAll, fetchByClub, create, remove };
