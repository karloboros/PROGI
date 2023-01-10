import { extractData } from './helpers';
import request from './request';

const urls = {
  root: '/clubs',
  get create() {
    return this.root + '/create';
  },
  get fetchAll() {
    return this.root + '/all';
  },
  get fetchPending() {
    return this.root + '/pending';
  },
  get fetchApproved() {
    return this.root + '/approved';
  },
  fetchById(id) {
    return `${urls.root}/${id}`;
  },
  edit(id) {
    return `${urls.root}/edit/${id}`;
  },
  remove(id) {
    return `${urls.root}/remove/${id}`;
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

const fetchAll = () => {
  return request.get(urls.fetchAll).then(extractData);
};

const fetchById = id => {
  return request.get(urls.fetchById(id)).then(extractData);
};

const edit = (params = {}) => {
  return request.post(urls.edit(params.id), params).then(extractData);
};

const remove = id => {
  return request.delete(urls.remove(id));
};

const updateApprovalStatus = params => {
  return request.post(urls.updateApprovalStatus, params).then(extractData);
};

export default {
  create,
  fetchAll,
  fetchPending,
  fetchApproved,
  fetchById,
  edit,
  remove,
  updateApprovalStatus,
};
