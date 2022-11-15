import axios from 'axios';
import { headers as headersOptions } from './helpers';
import { StatusCodes } from 'http-status-codes';

const { FORBIDDEN } = StatusCodes;

const config = {
  baseURL: 'http://localhost:3001/api',
};

const request = (headers = headersOptions.default) => axios.create({ ...config, headers });

const isAuthError = err => [FORBIDDEN].includes(err.response.status);

request().interceptors.response.use(
  res => res,
  err => {
    if (isAuthError(err)) {
      // add logout action
      console.log('user logout');
    }

    throw err;
  },
);

export { request };
export default request();
