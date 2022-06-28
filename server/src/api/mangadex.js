const axios = require('axios');
const unset = require('unset-value');

const client = axios.create({
  baseURL: 'https://api.mangadex.org',
});

const unsetFromManga = [
  'attributes.isLocked',
  'attributes.links',
  'attributes.originalLanguage',
  'attributes.publicationDemographic',
  'attributes.chapterNumbersResetOnNewVolume',
  'attributes.version',
  'relationships',
];

const selectRelationshipsId = (manga, type) => manga.relationships.filter((item) => item.type === type)[0].id;

const getCoverUrl = async (manga) => {
  const coverId = selectRelationshipsId(manga, 'cover_art');
  const { data: { data: { attributes: { fileName: coverArt } } } } = await client.get(`/cover/${coverId}`);
  return `https://uploads.mangadex.org/covers/${manga.id}/${coverArt}`;
};

const getAuthorName = async (manga, type) => {
  const authorId = selectRelationshipsId(manga, type);
  const { data: { data: { attributes: { name } } } } = await client.get(`/author/${authorId}`);
  return name;
};



module.exports.getManga = async (mangaId) => {
  const { data: { data: manga } } = await client.get(`/manga/${mangaId}`);


  manga.attributes.coverUrl = await getCoverUrl(manga);
  manga.attributes.authors = {
    author: await getAuthorName(manga, 'author'),
    artist: await getAuthorName(manga, 'artist'),
  };
  unsetFromManga.forEach((prop) => unset(manga, prop));
  return manga;
};