import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3001/api',
});

const config = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
});

export const getMe = (options) => client.post('/user/me', options);

export const uploadAvatar = (data, token) => client.post('/user/avatar', data, config(token));
