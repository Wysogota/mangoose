module.exports.mangaListOptions = {
  includedTagsMode: 'AND',
  excludedTags: ['b13b2a48-c720-44a9-9c77-39c9979373fb'], /* -- doujinshi -- */
  originalLanguage: ['ja', 'en'],
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

/**
 * Returns object with configured request params 
 * @param {{mangaId:int, lang:string, limit:int, offset:int}} options 
 * @returns {Object} options
 */
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


/**
 * Returns object with configured request params 
 * @param {{mangaId:int, groupId:int}} options 
 * @param {boolean} isNext
 * @returns {Object} options
 */
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

/**
 * Returns object with configured request params 
 * @param {{mangaId:int, lang:string}} options 
 * @returns {Object} options
 */
module.exports.firstChapterIdOptions = (options) => ([
  { 'manga': options.mangaId },
  { 'translatedLanguage': [options.lang] },
  { 'order[volume]': 'asc' },
  { 'order[chapter]': 'asc' },
  { 'limit': 1 },
]);

/**
 * Returns object with configured request params
 * @param {string} name 
 * @returns {Object} options
 */
module.exports.authorOptions = (name) => ({
  name,
  limit: 1,
});

module.exports.stringifyOptions = {
  arrayFormat: 'bracket'
};