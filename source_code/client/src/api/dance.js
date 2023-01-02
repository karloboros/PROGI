import { extractData, headers } from './helpers';
import request, { request as customRequest } from './request';

const urls = {
  root: '/dances',
  get create() {
    return this.root + '/create';
  },
  get remove() {
    return this.root + '/remove';
  },
  get fetchAll() {
    return this.root + '/all';
  },
  get fetchById() {
    return this.root;
  },
  get upload() {
    return this.root + '/upload';
  },
  get edit() {
    return this.root + '/edit';
  },
};

const create = (params = {}) => {
  return request.post(urls.create, params).then(extractData);
};

const edit = (params = {}) => {
  return request.post(urls.edit + `/${params.id}`, params).then(extractData);
};

const fetchById = id => {
  return request.get(urls.fetchById + `/${id}`).then(extractData);
};

const fetchAll = () => {
  return request.get(urls.fetchAll).then(extractData);
};

const remove = id => {
  return request.delete(urls.remove + `/${id}`);
};

const upload = params => {
  return customRequest(headers.fileUpload).post(urls.upload, params).then(extractData);
};

export default {
  create,
  fetchAll,
  remove,
  edit,
  upload,
  fetchById,
};
