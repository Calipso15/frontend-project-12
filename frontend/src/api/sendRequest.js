import axios from 'axios';

const sendRequest = (method, endpoint, data, token) => {
  const BASE_URL = '/api/v1';
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  if (!data) {
    return axios[method](`${BASE_URL}/${endpoint}`, { headers });
  }
  return axios[method](`${BASE_URL}/${endpoint}`, data, { headers });
};

export default sendRequest;
