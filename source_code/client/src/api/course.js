import { extractData } from './helpers';
import request from './request';

const urls = {
  root: '/courses',
  get create() {
    return this.root + '/create';
  },
  get remove() {
    return this.root + '/remove';
  },
  get fetchAll() {
    return this.root + '/all';
  },
  get fetchByClub() {
    return this.root + '/test';
  },
  get fetchById() {
    return this.root;
  },
  get edit() {
    return this.root + '/edit';
  },
};

const create = (params = {}) => {
  return request.post(urls.create + `/${params.clubId}`, params).then(extractData);
};

const edit = (params = {}) => {
  return request.post(urls.edit + `/${params.id}`, params).then(extractData);
};

const fetchById = (params = {}) => {
  return request.get(urls.fetchById + `/${params.id}`, params).then(extractData);
};

const fetchAll = () => {
  return request.get(urls.fetchAll).then(extractData);
};
const fetchByClub = clubId => {
  return request.get(urls.fetchByClub + `/${clubId}`, clubId).then(extractData);
};

const remove = id => {
  return request.delete(urls.remove + `/${id}`, id);
};

/* const upload = params => {
  return customRequest(headers.fileUpload).post(urls.upload, params).then(extractData);
}; */

export default {
  create,
  fetchAll,
  remove,
  edit,
  fetchByClub,
  fetchById,
};
