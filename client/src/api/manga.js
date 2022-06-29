import axios from 'axios';
import { stringify } from 'query-string';

const client = axios.create({
  baseURL: 'http://localhost:3001/api',
});

export const getManga = (mangaId) => client.get(`/manga/${mangaId}`);

export const getMangaCatalog = (options) => client.get(`/manga/?${stringify(options)}`);