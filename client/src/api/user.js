import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3001/api',
});

export const getMe = (options) => client.post('/user/me', options);

export const uploadAvatar = (data) => client.post('/user/avatar', data);
