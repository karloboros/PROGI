import { extractData, headers } from './helpers';
import request, { request as customRequest } from './request';

const urls = {
  root: '/users',
  get login() {
    return this.root + '/login';
  },
  get register() {
    return this.root + '/register';
  },
  get logout() {
    return this.root + '/logout';
  },
  get upload() {
    return this.root + '/upload';
  },
  get edit() {
    return this.root + '/edit';
  },
  get remove() {
    return this.root;
  },
};

const login = credentials => {
  return request.post(urls.login, credentials).then(extractData);
};

const register = user => {
  return request.post(urls.register, user).then(extractData);
};

const logout = () => {
  return request.post(urls.logout).then(extractData);
};

const upload = params => {
  return customRequest(headers.fileUpload).post(urls.upload, params).then(extractData);
};

const edit = user => {
  return request.post(urls.edit, user).then(extractData);
};

const remove = () => {
  return request.delete(urls.remove);
};

export default {
  login,
  register,
  logout,
  upload,
  edit,
  remove,
};
