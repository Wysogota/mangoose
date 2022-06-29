const axios = require('axios');
const queryString = require('query-string');

const client = axios.create({
  baseURL: 'https://api.mangadex.org',
});

const defaultListOptions = {
  includedTagsMode: 'AND',
  'excludedTags[]': 'b13b2a48-c720-44a9-9c77-39c9979373fb', /* -- doujinshi -- */
  'contentRating[]': ['safe', 'suggestive'],
};

const relationshipsOptions = {
  'includes[]': ['cover_art', 'author', 'artist']
};


module.exports.getMangaList = async (userOptions) => {
  const options = Object.assign(userOptions, defaultListOptions, relationshipsOptions);
  const query = queryString.stringify(options);
  const { data: { data: mangaList } } = await client.get(`/manga?${query}`);
  return mangaList;
};

module.exports.getManga = async (mangaId) => {
  const query = queryString.stringify(relationshipsOptions);
  const { data: { data: manga } } = await client.get(`/manga/${mangaId}?&${query}`);
  return manga;
};