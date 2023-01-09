import { extractData } from './helpers';
import request from './request';

const urls = {
  root: '/user-courses',
  get apply() {
    return this.root + '/apply';
  },
  get updateStatus() {
    return this.root + '/update-status';
  },
  getAccepted(courseId) {
    return `${urls.root}/approved/${courseId}`;
  },
  getPending(courseId) {
    return `${urls.root}/pending/${courseId}`;
  },
  getYourApplications(userId) {
    return `${urls.root}/${userId}`;
  },
};

const send = (params = {}) => {
  return request.post(urls.apply, params).then(extractData);
};

const updateStatus = params => {
  return request.post(urls.updateStatus, params).then(extractData);
};

const getAccepted = courseId => {
  return request.get(urls.getAccepted(courseId)).then(extractData);
};

const getPending = courseId => {
  return request.get(urls.getPending(courseId)).then(extractData);
};

const getYourApplications = userId => {
  return request.get(urls.getYourApplications(userId)).then(extractData);
};


export default { send, updateStatus, getAccepted, getPending, getYourApplications };
