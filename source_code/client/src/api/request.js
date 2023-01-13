import { headers as headersOptions, isAuthError } from './helpers';
import axios from 'axios';
import { useAuthStore } from '@/store';

const config = {
  baseURL: '/api',
};

const request = (headers = headersOptions.default) => axios.create({ ...config, headers });
const req = request();

req.interceptors.response.use(
  res => res,
  err => {
    if (isAuthError(err)) {
      useAuthStore().logout();
      return window.location.reload();
    }
    throw err;
  },
);

export { request };
export default req;
