const { MangaLists, RecommendationList } = require('../models/mongo');
const { getResponse } = require('../functions/controllers.fn');
const { MANGA_LIST_NAMES } = require('../constants');

module.exports.getLists = async (req, res, next) => {
  try {
    const { user } = req;

    const filter = { userId: user.id };
    const options = { upsert: true, new: true };

    const data = await MangaLists.findOneAndUpdate(filter, {}, options);
    res.status(200).send({ data });
  } catch (error) {
    next(error);
  }
};

module.exports.addMangaToList = async (req, res, next) => {
  try {
    const { body: { mangaId, list }, user } = req;

    const filter = { userId: user.id };
    const options = { upsert: true, new: true };

    const pullLists = Object.assign({},
      ...Object.values(MANGA_LIST_NAMES)
        .map((pullList) => ({ [`lists.${pullList}`]: mangaId }))
    );
    const pushList = { [`lists.${list}`]: mangaId };

    await MangaLists.findOneAndUpdate(filter, { $pull: pullLists }, options);
    const data = await MangaLists.findOneAndUpdate(filter, { $push: pushList }, options);

    res.status(200).send(getResponse('Lists founded.', { data }));
  } catch (error) {
    next(error);
  }
};

module.exports.removeMangaFromList = async (req, res, next) => {
  try {
    const { body: { mangaId, list }, user } = req;

    const filter = { userId: user.id };
    const options = { new: true };

    const data = await MangaLists.findOneAndUpdate(filter, { $pull: { [`lists.${list}`]: mangaId } }, options);

    res.status(200).send({ data });
  } catch (error) {
    next(error);
  }
};

module.exports.getList = async (req, res, next) => {
  try {
    const { body: { mangaId }, user } = req;

    const filter = { userId: user.id };
    const options = { upsert: true, new: true };

    const data = await MangaLists.findOneAndUpdate(filter, {}, options);
    const list = Object.entries(data.lists)
      .map(([list, array]) => array.map((id) => ({ id, list })))
      .flat()
      .filter(({ id }) => id === mangaId).map(({ list }) => list)[0];

    res.status(200).send(list
      ? getResponse('List founded.', { list })
      : getResponse('List not founded.')
    );
  } catch (error) {
    next(error);
  }
};

module.exports.getMangaFromRecommendationList = async (req, res, next) => {
  try {
    const { params: { mangaId } } = req;
    const data = await RecommendationList.findOne({ id: mangaId });
    if (data) {
      const { id, userId, display } = data;
      res.status(200).send(getResponse('Manga founded.', {
        manga: { id, userId, display }
      }));
    } else {
      res.status(200).send(getResponse('Manga not founded.', {
        manga: { display: false }
      }));
    }
  } catch (error) {
    next(error);
  }
};

module.exports.getRecommendationList = async (req, res, next) => {
  try {
    const data = await RecommendationList.find({ display: true });
    const ids = data.map(({ id }) => id);

    res.status(200).send(getResponse('Recommendation list got.', { list: ids }));
  } catch (error) {
    next(error);
  }
};

module.exports.getFullRecommendationList = async (req, res, next) => {
  try {
    const data = await RecommendationList.find();
    const result = data.map(({ id, userId, display }) => ({ id, userId, display }));
    res.status(200).send(getResponse('Recommendation list got.', { list: result }));
  } catch (error) {
    next(error);
  }
};

module.exports.addMangaToRecommendation = async (req, res, next) => {
  try {
    const { body: { mangaId, display: reqDisplay }, user } = req;

    const filter = { id: mangaId };
    const options = { upsert: true, new: true };

    const data = await RecommendationList.findOneAndUpdate(filter, {
      userId: user.id,
      display: reqDisplay,
    }, options);

    const { id, userId, display } = data;
    res.status(200).send(getResponse('Manga Saved.', {
      manga: { id, userId, display }
    }));
  } catch (error) {
    next(error);
  }
};

module.exports.removeMangaFromRecommendation = async (req, res, next) => {
  try {
    const { body: { mangaId } } = req;

    const filter = { id: mangaId };
    await RecommendationList.findOneAndDelete(filter);
    const data = await RecommendationList.find();

    const result = data.map(({ id, userId, display }) => ({ id, userId, display }));
    res.status(200).send(getResponse('Manga removed.', { list: result }));
  } catch (error) {
    next(error);
  }
};
