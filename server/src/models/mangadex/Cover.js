module.exports = class Cover {
  constructor(obj) {
    this.id = obj.id;
    this.mangaId = obj.relationships.filter((item) => item.type === 'manga')[0].id;
    this.volume = obj.attributes.volume;
    this.getCoverUrl(obj);
  }

  getCoverUrl = (obj) => {
    const coverName = obj.attributes.fileName;
    const coverUrl = `https://uploads.mangadex.org/covers/${this.mangaId}/${coverName}`;
    this.urls = {
      raw: coverUrl,
      '256': coverUrl + '.256.jpg',
      '512': coverUrl + '.512.jpg',
    };
  };

};