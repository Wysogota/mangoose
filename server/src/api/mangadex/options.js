module.exports.mangaListOptions = {
  includedTagsMode: 'AND',
  excludedTags: ['b13b2a48-c720-44a9-9c77-39c9979373fb'], /* -- doujinshi -- */
  originalLanguage: ['ja'],
  contentRating: ['safe', 'suggestive'],
};

module.exports.relationshipsOptions = {
  includes: ['cover_art', 'author', 'artist']
};

module.exports.coversOptions = (options) => ({
  manga: [options.mangaId],
  'order[volume]': 'asc',
  limit: options.limit,
  offset: options.offset,
});

module.exports.chaptersOptions = (options) => ([
  { 'manga': options.mangaId },
  { 'translatedLanguage': [options.lang] },
  { 'order[volume]': 'asc' },
  { 'order[chapter]': 'asc' },
  { 'limit': options.limit },
  { 'offset': options.offset },
  { 'includes': ['scanlation_group', 'user'] }
]);

module.exports.relationshipsChapterOptions = {
  includes: ['manga', 'scanlation_group']
};

module.exports.nextChapterIdOptions = (options, isNext) => {
  const parsedChapter = Number.parseInt(options.chapter);
  const chapter = isNext ? parsedChapter + 1 : parsedChapter - 1;

  return {
    manga: options.mangaId,
    groups: [options.groupId],
    chapter,
    limit: 1,
  };
};

module.exports.stringifyOptions = {
  arrayFormat: 'bracket'
};