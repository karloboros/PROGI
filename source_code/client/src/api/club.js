import { extractData } from './helpers';
import request from './request';

const urls = {
  root: '/clubs',
  get create() {
    return this.root + '/create';
  },
};

const create = (params = {}) => {
  return request.post(urls.login, params).then(extractData);
};

export default {
  create,
};
