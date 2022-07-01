const createError = require('http-errors');
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