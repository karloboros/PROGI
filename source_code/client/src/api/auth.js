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
  get edit() {
    return this.root + '/edit';
  },
  get remove() {
    return this.root;
  },
  get upload() {
    return this.root + '/upload';
  },
  get fetchTrainers() {
    return this.root + '/trainers';
  },
  get fetchAll() {
    return this.root + '/all';
  },
  fetchById(id) {
    return `${urls.root}/${id}`;
  },
  removeById(id) {
    return `${urls.root}/${id}`;
  },
  get fetchDanceEvents() {
    return '/dances' + '/dance-events';
  },
  get fetchEventDance() {
    return '/events' + '/event-Dance';
  },
  get fetchEventLocation() {
    return '/events' + '/events-with-location';
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

const edit = user => {
  return request.post(urls.edit, user).then(extractData);
};

const fetchDanceEvents = () => {
  return request.get(urls.fetchDanceEvents).then(extractData);
};

const fetchEventLocation = () => {
  return request.get(urls.fetchEventLocation).then(extractData);
};

const remove = () => {
  return request.delete(urls.remove);
};

const upload = params => {
  return customRequest(headers.fileUpload).post(urls.upload, params).then(extractData);
};

const fetchTrainers = () => {
  return request.get(urls.fetchTrainers).then(extractData);
};

const fetchAll = () => {
  return request.get(urls.fetchAll).then(extractData);
};

const fetchById = id => {
  return request.get(urls.fetchById(id)).then(extractData);
};

const removeById = id => {
  return request.delete(urls.removeById(id));
};

export default {
  login,
  register,
  logout,
  edit,
  fetchDanceEvents,
  fetchEventLocation,
  remove,
  upload,
  fetchTrainers,
  fetchAll,
  fetchById,
  removeById,
};
