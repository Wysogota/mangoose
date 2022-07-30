const { User } = require('../models');
const MangaLists = require('../models/mongo/MangaLists');
const { MANGA_LIST_NAMES } = require('../constants');

module.exports.addMangaToList = async (req, res, next) => {
  try {
    const { body: { mangaId, list }, decodedEmail } = req;
    const user = await User.findOne({ where: { email: decodedEmail } });

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
