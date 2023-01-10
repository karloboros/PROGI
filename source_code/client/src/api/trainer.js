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
  get upload() {
    return this.root + '/upload';
  },
  getAccepted(clubId) {
    return `${urls.root}/approved/${clubId}`;
  },
  getPending(clubId) {
    return `${urls.root}/pending/${clubId}`;
  },
};

const apply = (params = {}) => {
  return request.post(urls.apply(params.clubId), params).then(extractData);
};

const updateStatus = (params = {}) => {
  return request.post(urls.updateStatus, params).then(extractData);
};

const upload = (params = {}) => {
  return customRequest(headers.fileUpload).post(urls.upload, params).then(extractData);
};

const getAccepted = clubId => {
  return request.get(urls.getAccepted(clubId)).then(extractData);
};

const getPending = clubId => {
  return request.get(urls.getPending(clubId)).then(extractData);
};

export default { apply, updateStatus, getAccepted, upload, getPending };
