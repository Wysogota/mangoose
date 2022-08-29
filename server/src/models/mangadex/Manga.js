module.exports = class Manga {
  constructor(obj) {
    Object.assign(this, obj);
    this.getCoverUrl();
  }

  selectRelationship = (type) => this.relationships.filter((item) => item.type === type)[0];

  getCoverUrl = () => {
    const { PORT, DOMAIN } = process.env;
    const coverName = this.selectRelationship('cover_art').attributes.fileName;
    const coverUrl = `http://${DOMAIN}:${PORT}/api/cover/${this.id}/${coverName}`;
    this.selectRelationship('cover_art').attributes.urls = {
      raw: coverUrl,
      '256': coverUrl + '.256.jpg',
      '512': coverUrl + '.512.jpg',
    };
  };
};