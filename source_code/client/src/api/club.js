import { extractData } from './helpers';
import request from './request';

const urls = {
  root: '/clubs',
  get create() {
    return this.root + '/create';
  },
  get fetchPending() {
    return this.root + '/pending';
  },
};

const create = (params = {}) => {
  return request.post(urls.create, params).then(extractData);
};

const fetchPending = () => {
  return request.get(urls.fetchPending).then(extractData);
};

export default {
  create,
  fetchPending,
};
