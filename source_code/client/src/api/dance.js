import { extractData, headers } from './helpers';
import request, { request as customRequest } from './request';

const urls = {
  root: '/dances',
  get fetchAll() {
    return this.root + '/all';
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
    return `${urls.root}/remove/${id}`;
  },
  get upload() {
    return this.root + '/upload';
  },
};

const fetchAll = () => {
  return request.get(urls.fetchAll).then(extractData);
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

const upload = (params = {}) => {
  return customRequest(headers.fileUpload).post(urls.upload, params).then(extractData);
};

export default {
  fetchAll,
  fetchById,
  create,
  edit,
  remove,
  upload,
};
