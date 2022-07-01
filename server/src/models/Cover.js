module.exports = class Cover {
  constructor(obj) {
    this.id = obj.id;
    this.mangaId = obj.relationships.filter((item) => item.type === 'manga')[0].id;
    this.volume = obj.attributes.volume;
    this.url = this.getCoverUrl(obj);
  }

  getCoverUrl = (obj) => {
    const coverName = obj.attributes.fileName;
    return `https://uploads.mangadex.org/covers/${this.mangaId}/${coverName}`;
  };

};