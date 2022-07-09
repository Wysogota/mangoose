const mangadex = require('../api/mangadex');

module.exports.getChapter = async (req, res, next) => {
  try {
    const { params: { chapterId } } = req;
    const chapter = await mangadex.getChapter({ chapterId });
    res.status(200).send({ data: chapter });
  } catch (error) {
    next(error);
  }
};
module.exports.getChapters = async (req, res, next) => {
  try {
    const { query } = req;
    const chapters = await mangadex.getChapters(query);
    res.status(200).send({ data: chapters });
  } catch (error) {
    next(error);
  }
};

module.exports.getChapterPages = async (req, res, next) => {
  try {
    const { params: { chapterId } } = req;
    const chapterPages = await mangadex.getChapterPages({ chapterId });
    res.status(200).send({ data: chapterPages });
  } catch (error) {
    next(error);
  }
};

module.exports.getNextChapterId = async (req, res, next) => {
  try {
    const { query } = req;
    const chaptersId = await mangadex.getNextChapterId(query);
    res.status(200).send({ data: chaptersId });
  } catch (error) {
    next(error);
  }
};

module.exports.getFirstChapterId = async (req, res, next) => {
  try {
    const { query } = req;
    const chapterId = await mangadex.getFirstChapterId(query);
    res.status(200).send({ data: chapterId });
  } catch (error) {
    next(error);
  }
};