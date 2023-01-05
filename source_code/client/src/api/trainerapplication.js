import { extractData } from './helpers';
import request from './request';

const urls = {
  root: '/trainer-applications',
  get sendApplication() {
    return this.root + '/send';
  },
  get updateStatus() {
    return this.root + '/update-status';
  },
  get getAccepted() {
    return this.root + '/get-accepted';
  },
  get getPending() {
    return this.root + '/get-pending';
  },
  get getRejected() {
    return this.root + '/get-rejected';
  },
};

const send = (params = {}) => {
  return request.post(urls.sendApplication, params).then(extractData);
};

const update = params => {
  return request.get(urls.updateStatus, params).then(extractData);
};

const getAccepted = params => {
  return request.get(urls.getAccepted, params).then(extractData);
};

const getRejected = params => {
  return request.get(urls.getRejected, params).then(extractData);
};

const getPending = clubId => {
  return request.get(urls.getPending + `/${clubId}`).then(extractData);
};

export default { send, update, getAccepted, getRejected, getPending };
