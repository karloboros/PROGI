import { extractData } from './helpers';
import request from './request';

const urls = {
  root: '/lessons',
  get create() {
    return this.root + '/create';
  },
  get remove() {
    return this.root + '/remove';
  },
  fetchAll(courseId) {
    return `${urls.root}/${courseId}`;
  },
  get fetchById() {
    return this.root;
  },
  get edit() {
    return this.root + '/edit';
  },
};

const create = (params = {}) => {
  return request.post(urls.create, params).then(extractData);
};

const fetchAll = courseId => {
  return request.get(urls.fetchAll(courseId)).then(extractData);
};
const fetchByClub = clubId => {
  return request.get(urls.fetchByClub + `/${clubId}`, clubId).then(extractData);
};

const remove = id => {
  return request.delete(urls.remove + `/${id}`);
};

/* const upload = params => {
  return customRequest(headers.fileUpload).post(urls.upload, params).then(extractData);
}; */
export default { create, remove, fetchAll, fetchByClub };
