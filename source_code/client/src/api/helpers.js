const extractData = res => res.data;

const headers = {
  default: { 'Content-Type': 'multipart/form-data' },
  fileUpload: { 'Content-Type': 'multipart/form-data' },
};

export { extractData, headers };
