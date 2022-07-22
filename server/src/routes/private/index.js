const basename = require('path').basename(__filename);
const privateRouter = require('express').Router();
const privateAccess = require('../../middlewares/tokenChecker.mw');
const { forEachJSFileInFolder } = require('../../functions/fs.fn');

privateRouter.use(privateAccess);

forEachJSFileInFolder(__dirname, basename, (file) => {
  const filename = file.slice(0, -3);
  privateRouter.use(`/${filename}`, require(`./${filename}`));
});

module.exports = privateRouter;