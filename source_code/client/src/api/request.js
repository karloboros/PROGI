import axios from 'axios';
import { headers as headersOptions } from './helpers';
import { StatusCodes } from 'http-status-codes';
import { useAuthStore } from '@/store';

const { FORBIDDEN } = StatusCodes;

const config = {
  baseURL: '/api',
};

const request = (headers = headersOptions.default) => axios.create({ ...config, headers });

const isAuthError = err => [FORBIDDEN].includes(err.response.status);

const req = request();

req.interceptors.response.use(
  res => res,
  err => {
    if (isAuthError(err)) {
      useAuthStore().removeUser();
      return window.location.reload();
    }
    throw err;
  },
);

export { request };
export default req;
