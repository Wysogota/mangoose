const axios = require('axios');
const queryString = require('query-string');
const Manga = require('../../models/Manga');
const Cover = require('../../models/Cover');
const {
  coversOptions, chapterOptions, defaultListOptions,
  relationshipsOptions, relationshipsChapterOptions,
  stringifyOptions
} = require('./options');

const client = axios.create({
  baseURL: 'https://api.mangadex.org',
});

module.exports.getMangaCovers = async (options) => {
  const query = queryString.stringify(coversOptions(options), stringifyOptions);
  const { data: { data, limit, offset, total } } = await client.get(`/cover?${query}`);
  const response = {
    covers: data.map((item) => new Cover(item)),
    limit,
    offset,
    total,
  };
  return response;
};

module.exports.getMangaList = async (options) => {
  const assignedOptions = Object.assign(
    options,
    defaultListOptions,
    relationshipsOptions
  );
  const query = queryString.stringify(assignedOptions, stringifyOptions);
  const { data: { data } } = await client.get(`/manga?${query}`);
  const mangaList = data.map((item) => new Manga(item));
  return mangaList;
};

module.exports.getManga = async (options) => {
  const query = queryString.stringify(relationshipsOptions, stringifyOptions);
  const { data: { data } } = await client.get(`/manga/${options.mangaId}?&${query}`);
  const manga = new Manga(data);
  return manga;
};

module.exports.getChapters = async (options) => {
  const query = chapterOptions(options)
    .map((item) => queryString.stringify(item, stringifyOptions))
    .join('&');
  const { data } = await client.get(`/chapter?${query}`);
  return data;
};

module.exports.getChapterPages = async (options) => {
  const { data: { chapter } } = await client.get(`/at-home/server/${options.chapterId}`);
  return chapter;
};

module.exports.getChapter = async (options) => {
  const query = queryString.stringify(relationshipsChapterOptions, stringifyOptions);
  const { data: { data } } = await client.get(`/chapter/${options.chapterId}?&${query}`);
  return data;
  // const manga = new Manga(data);
  // return manga;
};