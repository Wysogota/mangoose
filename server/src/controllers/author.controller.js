const mangadex = require('../api/mangadex');

module.exports.getAuthorManga = async (req, res, next) => {
  try {
    const { params: { authorName } } = req;
    const authorId = await mangadex.getAuthorId({ authorName });
    res.status(200).send({ data: authorId });
  } catch (error) {
    next(error);
  }
};
