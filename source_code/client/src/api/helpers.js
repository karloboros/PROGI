const extractData = res => res.data;

const headers = {
  default: { 'Content-Type': 'application/json' },
  fileUpload: { 'Content-Type': 'multipart/form-data' },
};

export { extractData, headers };
