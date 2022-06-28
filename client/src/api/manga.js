import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3001/api',
});

export const getManga = (mangaId) => client.get(`/manga/${mangaId}`);