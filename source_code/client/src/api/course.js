import { extractData } from './helpers';
import request from './request';

const urls = {
  root: '/map',
  get fetchCoursesLocations() {
    return this.root + '/courses-locations';
  },
};

const fetchCoursesLocations = () => {
  return request.post(urls.fetchCoursesLocations).then(extractData);
};

export default { fetchCoursesLocations };
