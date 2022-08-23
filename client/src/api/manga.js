import axios from 'axios';
import { stringify } from 'query-string';

const client = axios.create({
  baseURL: 'http://localhost:3000/api',
});

const stringifyOptions = {
  arrayFormat: 'bracket'
};

export const getManga = (options) => client.get(`/manga/${options.mangaId}`);

export const getMangaCatalog = (options) => client.get(`/manga/?${stringify(options, stringifyOptions)}`);

export const getMangaCovers = (options) => client.get(`/cover/?${stringify(options, stringifyOptions)}`);

export const getChapter = (options) => client.get(`/chapter/${options.chapterId}`);

export const getChapters = (options) => client.get(`/chapter/?${stringify(options, stringifyOptions)}`);

export const getChapterPages = (options) => client.get(`/chapter/pages/${options.chapterId}`);

export const getNextChapterId = (options) => client.get(`/chapter/next/?${stringify(options, stringifyOptions)}`);

export const getFirstChapterId = (options) => client.get(`/chapter/first/?${stringify(options, stringifyOptions)}`);

export const getTagList = () => client.get('/manga/tag');

export const getMangaLists = (options) => client.post('/mangaLists', options);

export const getList = (options) => client.post('/mangaLists/list', options);

export const saveMangaToList = (options) => client.post('/mangaLists/add', options);

export const removeMangaFromList = (options) => client.post('/mangaLists/remove', options);

export const getMangaFromRecommendationList = ({ mangaId, token }) => client.post(`/mangaLists/recommendation/${mangaId}`, { token });

export const getRecommendationList = () => client.get('/mangaLists/recommendation');

export const getFullRecommendationList = (options) => client.post('/mangaLists/recommendation/full', options);

export const saveMangaToRecommendationList = (options) => client.post('/mangaLists/recommendation/add', options);

export const removeMangaFromRecommendationList = (options) => client.post('/mangaLists/recommendation/remove', options);
