import { extractData, headers } from './helpers';
import request from './request';

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
  return request.post(urls.upload, params, headers.fileUpload).then(extractData);
};

export default {
  login,
  register,
  logout,
  upload,
};
