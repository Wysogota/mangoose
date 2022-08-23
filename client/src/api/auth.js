import axios from 'axios';

axios.defaults.withCredentials = true;
// eslint-disable-next-line no-undef
const { REACT_APP_DOMAIN: DOMAIN, REACT_APP_SERVER_PORT: SERVER_PORT } = process.env;

const client = axios.create({
  baseURL: `http://${DOMAIN}:${SERVER_PORT}/api`,
});

export const signUp = (options) => client.post('/auth/signup', options);

export const signIn = (options) => client.post('/auth/signin', options);

export const signOut = () => client.delete('/auth/signout');

export const refreshToken = () => client.get('/auth/refresh');
