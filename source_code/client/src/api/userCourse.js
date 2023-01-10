import { extractData } from './helpers';
import request from './request';

const urls = {
  root: '/user-courses',
  apply(courseId) {
    return `${urls.root}/apply/${courseId}`;
  },
  get updateStatus() {
    return this.root + '/update-status';
  },
  fetchAccepted(courseId) {
    return `${urls.root}/approved/${courseId}`;
  },
  fetchPending(courseId) {
    return `${urls.root}/pending/${courseId}`;
  },
  getYourApplications(userId) {
    return `${urls.root}/${userId}`;
  },
};

const apply = (params = {}) => {
  return request.post(urls.apply(params.courseId), params).then(extractData);
};

const updateStatus = params => {
  return request.post(urls.updateStatus, params).then(extractData);
};

const fetchAccepted = courseId => {
  return request.get(urls.fetchAccepted(courseId)).then(extractData);
};

const fetchPending = courseId => {
  return request.get(urls.fetchPending(courseId)).then(extractData);
};

const getYourApplications = userId => {
  return request.get(urls.getYourApplications(userId)).then(extractData);
};

export default { apply, updateStatus, fetchAccepted, fetchPending, getYourApplications };
