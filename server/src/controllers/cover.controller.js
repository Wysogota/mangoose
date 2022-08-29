const axios = require('axios');
const mangadex = require('../api/mangadex');

module.exports.getMangaCovers = async (req, res, next) => {
  try {
    const { query } = req;
    const manga = await mangadex.getMangaCovers(query);
    res.status(200).send({ data: manga });
  } catch (error) {
    next(error);
  }
};

module.exports.getCover = async (req, res, next) => {
  try {
    const { params: { mangaId, coverName } } = req;
    const coverUrl = `https://uploads.mangadex.org/covers/${mangaId}/${coverName}`;
    const image = await axios.get(coverUrl, { responseType: 'arraybuffer' });
    const cover = Buffer.from(image.data, 'base64');

    res
      .status(200)
      .set({
        'Content-Type': image.headers['content-type'],
        'Content-Length': image.headers['content-length']
      })
      .send(cover);
  } catch (error) {
    next(error);
  }
};