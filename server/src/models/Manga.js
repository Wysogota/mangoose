module.exports = class Manga {
  constructor(obj) {
    Object.assign(this, obj);
    this.getCoverUrl();
  }

  selectRelationship = (type) => this.relationships.filter((item) => item.type === type)[0];

  getCoverUrl = () => {
    const coverName = this.selectRelationship('cover_art').attributes.fileName;
    const coverUrl = `https://uploads.mangadex.org/covers/${this.id}/${coverName}`;
    this.selectRelationship('cover_art').attributes.url = coverUrl;
  };
}