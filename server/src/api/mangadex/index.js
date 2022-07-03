const axios = require('axios');
const queryString = require('query-string');
const Manga = require('../../models/Manga');
const Cover = require('../../models/Cover');
const { coversOptions, defaultListOptions, relationshipsOptions, stringifyOptions } = require('./options');

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