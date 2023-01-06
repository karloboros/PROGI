import { extractData } from './helpers';
import request from './request';

const urls = {
  root: '/lessons',
  get create() {
    return this.root + '/create';
  },
};

const create = (params = {}) => {
  return request.post(urls.create, params).then(extractData);
};
export default {
  create,
};
