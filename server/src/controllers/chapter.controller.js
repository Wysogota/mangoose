const mangadex = require('../api/mangadex');

module.exports.getChapters = async (req, res, next) => {
  try {
    const { query } = req;
    const chapters = await mangadex.getChapters(query);
    res.status(200).send({ data: chapters });
  } catch (error) {
    next(error);
  }
};