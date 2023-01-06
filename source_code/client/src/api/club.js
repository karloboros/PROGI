import { extractData } from './helpers';
import request from './request';

const urls = {
  root: '/clubs',
  get create() {
    return this.root + '/create';
  },
  get fetchPending() {
    return this.root + '/pending';
  },
  get fetchApproved() {
    return this.root + '/approved';
  },
  get updateApprovalStatus() {
    return this.root + '/update-approval';
  },
};

const create = (params = {}) => {
  return request.post(urls.create, params).then(extractData);
};

const fetchPending = () => {
  return request.get(urls.fetchPending).then(extractData);
};

const fetchApproved = () => {
  return request.get(urls.fetchApproved).then(extractData);
};
const updateApprovalStatus = params => {
  return request.post(urls.updateApprovalStatus, params).then(extractData);
};

export default {
  create,
  fetchPending,
  fetchApproved,
  updateApprovalStatus,
};
