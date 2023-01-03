import { extractData } from './helpers';
import request from './request';

const urls = {
  root: '/courses',
  get fetchCoursesLocations() {
    return this.root + '/all';
  },
};

const fetchCoursesLocations = () => {
  return request.get(urls.fetchCoursesLocations).then(extractData);
};

export default { fetchCoursesLocations };
