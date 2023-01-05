import { extractData } from './helpers';
import request from './request';

const urls = {
  root: '/trainer-applications',
  get test() {
    return this.root + '/test';
  },
  get approved() {
    return this.root + '/approved';
  },
};

const test = () => {
  return request.get(urls.test).then(extractData);
};
const approved = () => {
  return request.get(urls.approved).then(extractData);
};

export default {
  test,
  approved,
};
