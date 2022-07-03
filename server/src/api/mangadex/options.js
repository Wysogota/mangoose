module.exports.defaultListOptions = {
  includedTagsMode: 'AND',
  'excludedTags': ['b13b2a48-c720-44a9-9c77-39c9979373fb'], /* -- doujinshi -- */
  'contentRating': ['safe', 'suggestive'],
};

module.exports.relationshipsOptions = {
  'includes': ['cover_art', 'author', 'artist']
};

module.exports.coversOptions = (options) => ({
  'manga': [options.mangaId],
  'order[volume]': 'asc',
  limit: options.limit,
  offset: options.offset,
});

module.exports.stringifyOptions = {
  arrayFormat: 'bracket'
};