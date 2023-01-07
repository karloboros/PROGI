import { extractData } from './helpers';
import request from './request';

const urls = {
  root: '/courses',
  get fetchAll() {
    return this.root + '/all';
  },
  fetchById(id) {
    return `${urls.root}/${id}`;
  },
};
const fetchAll = () => {
  return request.get(urls.fetchAll).then(extractData);
};

const fetchById = id => {
  return request.get(urls.fetchById(id)).then(extractData);
};

export default { fetchAll, fetchById };
