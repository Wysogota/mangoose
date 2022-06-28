const createError = require('http-errors');
const mangadex = require('../api/mangadex')

module.exports.getManga = async (req, res, next) => {
  try {
    const { params: { mangaId } } = req;
    const manga = await mangadex.getManga(mangaId);
    res.status(200).send({ data: manga });
  } catch (error) {
    next(error);
  }
};