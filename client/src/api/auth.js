import axios from 'axios';

axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: 'http://localhost:3001/api',
});

export const signUp = (options) => client.post('/auth/signup', options);

export const signIn = (options) => client.post('/auth/signin', options);

export const signOut = () => client.delete('/auth/signout');

export const refreshToken = () => client.get('/auth/refresh');
