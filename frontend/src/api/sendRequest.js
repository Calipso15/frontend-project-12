import axios from 'axios';

const sendRequest = (method, endpoint, data, token) => {
  const BASE_URL = '/api/v1';
  const headers = { Authorization: `Bearer ${token}` };
  if (token === null) {
    return axios[method](`${BASE_URL}/${endpoint}`, data);
  }
  if (data === null) {
    return axios[method](`${BASE_URL}/${endpoint}`, { headers });
  }
  return axios[method](`${BASE_URL}/${endpoint}`, data, { headers });
};

export default sendRequest;
