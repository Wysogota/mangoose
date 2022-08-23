import axios from 'axios';

// eslint-disable-next-line no-undef
const { REACT_APP_DOMAIN: DOMAIN, REACT_APP_SERVER_PORT: SERVER_PORT } = process.env;

const client = axios.create({
  baseURL: `http://${DOMAIN}:${SERVER_PORT}/api`,
});

const config = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
});

export const getMe = (options) => client.post('/user/me', options);

export const uploadAvatar = (data, token) => client.post('/user/avatar', data, config(token));
