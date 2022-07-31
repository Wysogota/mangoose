const MangaLists = require('../models/mongo/MangaLists');
const { MANGA_LIST_NAMES } = require('../constants');
const { getResponse } = require('../functions/controllers.fn');

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

    res.status(200).send({ data });
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
