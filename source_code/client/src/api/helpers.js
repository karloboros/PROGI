import { StatusCodes } from 'http-status-codes';

const extractData = res => res.data;

const isAuthError = err => [StatusCodes.FORBIDDEN].includes(err.response.status);

const headers = {
  default: { 'Content-Type': 'application/json' },
  fileUpload: { 'Content-Type': 'multipart/form-data' },
};

export { extractData, isAuthError, headers };
