import { extractData } from './helpers';
import request from './request';

const urls = {
  root: '/clubs',
  get fetchAll() {
    return this.root;
  },
  fetchById(id) {
    return `${urls.root}/${id}`;
  },
  get fetchApproved() {
    return this.root + '/approved';
  },
  get fetchPending() {
    return this.root + '/pending';
  },
  get create() {
    return this.root + '/create';
  },
  edit(id) {
    return `${urls.root}/edit/${id}`;
  },
  get updateApprovalStatus() {
    return this.root + '/update-approval';
  },
  remove(id) {
    return `${urls.root}/${id}`;
  },
};

const fetchAll = () => {
  return request.get(urls.fetchAll).then(extractData);
};

const fetchById = id => {
  return request.get(urls.fetchById(id)).then(extractData);
};

const fetchApproved = () => {
  return request.get(urls.fetchApproved).then(extractData);
};

const fetchPending = () => {
  return request.get(urls.fetchPending).then(extractData);
};

const create = (params = {}) => {
  return request.post(urls.create, params).then(extractData);
};

const edit = (params = {}) => {
  return request.post(urls.edit(params.id), params).then(extractData);
};

const updateApprovalStatus = params => {
  return request.post(urls.updateApprovalStatus, params).then(extractData);
};

const remove = id => {
  return request.delete(urls.remove(id));
};

export default {
  fetchAll,
  fetchById,
  fetchApproved,
  fetchPending,
  create,
  edit,
  updateApprovalStatus,
  remove,
};
