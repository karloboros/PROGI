import { extractData, headers } from './helpers';
import request, { request as customRequest } from './request';

const urls = {
  root: '/events',
  get fetchAll() {
    return this.urls;
  },
  get create() {
    return this.root + '/create';
  },
  get upload() {
    return this.root + '/upload';
  },
};

const fetchAll = () => {
  return request.get(urls.fetchAll).then(extractData);
};

const create = (params = {}) => {
  return request.post(urls.create, params).then(extractData);
};

const upload = (params = {}) => {
  return customRequest(headers.fileUpload).post(urls.upload, params).then(extractData);
};

export default {
  fetchAll,
  create,
  upload,
};
