import { extractData } from './helpers';
import request from './request';

const urls = {
  root: '/users',
  get fetchAll() {
    return this.root + '/all';
  },
  fetchById(id) {
    return `${urls.root}/${id}`;
  },
  get fetchTrainers() {
    return this.root + '/trainers';
  },
  get fetchDanceEvents() {
    return '/dances' + '/dance-events';
  },
  get fetchEventLocation() {
    return '/events' + '/events-with-location';
  },
  removeById(id) {
    return `${urls.root}/${id}`;
  },
};

const fetchAll = () => {
  return request.get(urls.fetchAll).then(extractData);
};

const fetchById = id => {
  return request.get(urls.fetchById(id)).then(extractData);
};

const fetchTrainers = () => {
  return request.get(urls.fetchTrainers).then(extractData);
};

const fetchDanceEvents = () => {
  return request.get(urls.fetchDanceEvents).then(extractData);
};

const fetchEventLocation = () => {
  return request.get(urls.fetchEventLocation).then(extractData);
};

const removeById = id => {
  return request.delete(urls.removeById(id));
};

export default {
  fetchAll,
  fetchById,
  fetchTrainers,
  fetchDanceEvents,
  fetchEventLocation,
  removeById,
};
