import { extractData } from './helpers';
import request from './request';

const urls = {
  root: '/courses',
  get create() {
    return this.root + '/create';
  },
  get remove() {
    return this.root + '/remove/:id';
  },
  get fetchAll() {
    return this.root + '/all';
  },
  get fetchById() {
    return this.root + '/:id';
  },
  get edit() {
    return this.root + '/edit/:id';
  },
};

const create = params => {
  return request.post(urls.create, params).then(extractData);
};

const edit = params => {
  return request.post(urls.edit, params).then(extractData);
};

const fetchById = params => {
  return request.get(urls.fetchById, params).then(extractData);
};

const fetchAll = () => {
  return request.get(urls.fetchAll).then(extractData);
};

const remove = id => {
  return request.delete(urls.remove, id);
};

/* const upload = params => {
  return customRequest(headers.fileUpload).post(urls.upload, params).then(extractData);
}; */

export default {
  create,
  fetchAll,
  remove,
  edit,
  fetchById,
};
