import axios from 'axios';

axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: 'http://localhost:3001/api',
});

export const signIn = (options) => client.post('/auth/signin', options);

export const signOut = () => client.delete('/auth/signout');
