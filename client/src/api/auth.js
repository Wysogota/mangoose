import axios from 'axios';

axios.defaults.withCredentials = true;
// eslint-disable-next-line no-undef
const { REACT_APP_DOMAIN: DOMAIN } = process.env;

const client = axios.create({
  baseURL: `https://${DOMAIN}/api`,
});

export const signUp = (options) => client.post('/auth/signup', options);

export const signIn = (options) => client.post('/auth/signin', options);

export const signOut = () => client.delete('/auth/signout');

export const refreshToken = () => client.get('/auth/refresh');
