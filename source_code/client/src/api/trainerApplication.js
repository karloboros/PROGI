import { extractData, headers } from './helpers';
import request, { request as customRequest } from './request';

const urls = {
  root: '/trainer-applications',
  apply(clubId) {
    return `${urls.root}/apply/${clubId}`;
  },
  get updateStatus() {
    return this.root + '/update-status';
  },
  fetchAccepted(clubId) {
    return `${urls.root}/approved/${clubId}`;
  },
  fetchPending(clubId) {
    return `${urls.root}/pending/${clubId}`;
  },
  get upload() {
    return this.root + '/upload';
  },
};

const apply = (params = {}) => {
  return request.post(urls.apply(params.clubId), params).then(extractData);
};

const updateStatus = (params = {}) => {
  return request.post(urls.updateStatus, params).then(extractData);
};

const fetchAccepted = clubId => {
  return request.get(urls.fetchAccepted(clubId)).then(extractData);
};

const fetchPending = clubId => {
  return request.get(urls.fetchPending(clubId)).then(extractData);
};

const upload = (params = {}) => {
  return customRequest(headers.fileUpload).post(urls.upload, params).then(extractData);
};

export default { apply, updateStatus, fetchAccepted, fetchPending, upload };
