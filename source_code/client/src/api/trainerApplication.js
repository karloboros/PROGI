import { extractData, headers } from './helpers';
import request, { request as customRequest } from './request';

const urls = {
  root: '/trainer-applications',
  fetchApproved(clubId) {
    return `${urls.root}/approved/${clubId}`;
  },
  fetchPending(clubId) {
    return `${urls.root}/pending/${clubId}`;
  },
  fetchByClubId(clubId) {
    return `${urls.root}/${clubId}`;
  },
  apply(clubId) {
    return `${urls.root}/apply/${clubId}`;
  },
  updateStatus(id) {
    return `${urls.root}/update-status/${id}`;
  },
  get upload() {
    return this.root + '/upload';
  },
};

const fetchApproved = clubId => {
  return request.get(urls.fetchApproved(clubId)).then(extractData);
};

const fetchPending = clubId => {
  return request.get(urls.fetchPending(clubId)).then(extractData);
};

const fetchByClubId = clubId => {
  return request.get(urls.fetchByClubId(clubId)).then(extractData);
};

const apply = (params = {}) => {
  return request.post(urls.apply(params.clubId), params).then(extractData);
};

const updateStatus = (params = {}) => {
  return request.post(urls.updateStatus(params.id), params).then(extractData);
};

const upload = (params = {}) => {
  return customRequest(headers.fileUpload).post(urls.upload, params).then(extractData);
};

export default { fetchApproved, fetchPending, fetchByClubId, apply, updateStatus, upload };
