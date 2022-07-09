const axios = require('axios');
const queryString = require('query-string');
const Manga = require('../../models/Manga');
const Cover = require('../../models/Cover');
const {
  coversOptions, chaptersOptions, mangaListOptions,
  relationshipsOptions, relationshipsChapterOptions,
  nextChapterIdOptions, firstChapterIdOptions, stringifyOptions
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
    mangaListOptions,
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
  const query = chaptersOptions(options)
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
  const { data: { data } } = await client.get(`/chapter/${options.chapterId}?${query}`);
  return data;
};

module.exports.getNextChapterId = async (options) => {
  const prevChapterQuery = queryString.stringify(nextChapterIdOptions(options), stringifyOptions);
  const nextChapterQuery = queryString.stringify(nextChapterIdOptions(options, true), stringifyOptions);
  const { data: { data: prevChapter } } = await client.get(`/chapter?${prevChapterQuery}`);
  const { data: { data: nextChapter } } = await client.get(`/chapter?${nextChapterQuery}`);
  return {
    prev: prevChapter[0]?.id,
    next: nextChapter[0]?.id
  };
};

module.exports.getFirstChapterId = async (options) => {
  const query = firstChapterIdOptions(options)
    .map((item) => queryString.stringify(item, stringifyOptions))
    .join('&');
  const { data: { data } } = await client.get(`/chapter?${query}`);
  return data[0].id;
};