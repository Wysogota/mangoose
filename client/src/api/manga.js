import axios from 'axios';
import { stringify } from 'query-string';

const client = axios.create({
  baseURL: 'http://192.168.1.147:3001/api',
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
