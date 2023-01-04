import { extractData } from './helpers';
import request from './request';

const urls = {
  root: '/courses',
  get fetchById() {
    return this.root;
  },
  get fetchCoursesLocations() {
    return this.root + '/all';
  },
};

const fetchById = id => {
  return request.get(urls.fetchById + `/${id}`).then(extractData);
};

const fetchCoursesLocations = () => {
  return request.get(urls.fetchCoursesLocations).then(extractData);
};

export default { fetchById, fetchCoursesLocations };
