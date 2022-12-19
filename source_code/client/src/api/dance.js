import { extractData, headers } from './helpers';
import request, { request as customRequest } from './request';

const urls = {
  root: '/dances',
  get create() {
    return this.root + '/create';
  },
  get remove() {
    return this.root + '/:id';
  },
  get fetchAll() {
    return this.root + '/all';
  },
  get upload() {
    return this.root + '/upload';
  },
  get edit() {
    return this.root + '/edit/:id';
  },
};

const create = (params = {}) => {
  return request.post(urls.create, params).then(extractData);
};

const edit = (params = {}) => {
  return request.post(urls.edit, params).then(extractData);
};

const fetchAll = () => {
  return request.get(urls.fetchAll).then(extractData);
};

const remove = id => {
  return request.delete(urls.remove, id);
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
};
