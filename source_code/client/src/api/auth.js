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
  get remove() {
    return this.root;
  },
  get upload() {
    return this.root + '/upload';
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

const remove = () => {
  return request.delete(urls.remove).then(extractData);
};

const upload = params => {
  return customRequest(headers.fileUpload).post(urls.upload, params).then(extractData);
};

export default {
  login,
  register,
  logout,
  remove,
  upload,
};
