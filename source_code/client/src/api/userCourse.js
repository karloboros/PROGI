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
  get getApproved() {
    return this.root + '/get-approved';
  },
  get getPending() {
    return this.root + '/get-pending';
  },
  get getRejected() {
    return this.root + '/get-rejected';
  },
  get getForUser() {
    return this.root + '/see-aplications';
  },
};

const send = (params = {}) => {
  return request.post(urls.apply, params).then(extractData);
};

const update = params => {
  return request.get(urls.updateStatus, params).then(extractData);
};

const getApproved = params => {
  return request.get(urls.getApproved, params).then(extractData);
};

const getRejected = params => {
  return request.get(urls.getRejected, params).then(extractData);
};

const getPending = clubId => {
  return request.get(urls.getPending + `/${clubId}`).then(extractData);
};

const getForUser = params => {
    return request.get(urls.getForUser, params).then(extractData);
  };

export default { send, update, getApproved, getRejected, getPending, getForUser };
