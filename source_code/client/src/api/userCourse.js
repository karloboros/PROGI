import { extractData } from './helpers';
import request from './request';

const urls = {
  root: '/user-courses',
  fetchApproved(courseId) {
    return `${urls.root}/approved/${courseId}`;
  },
  fetchPending(courseId) {
    return `${urls.root}/pending/${courseId}`;
  },
  apply(courseId) {
    return `${urls.root}/apply/${courseId}`;
  },
  updateStatus(id) {
    return `${urls.root}/update-status/${id}`;
  },
};

const fetchApproved = courseId => {
  return request.get(urls.fetchApproved(courseId)).then(extractData);
};

const fetchPending = courseId => {
  return request.get(urls.fetchPending(courseId)).then(extractData);
};

const apply = (params = {}) => {
  return request.post(urls.apply(params.courseId), params).then(extractData);
};

const updateStatus = params => {
  return request.post(urls.updateStatus(params.id), params).then(extractData);
};

export default { apply, updateStatus, fetchApproved, fetchPending };
