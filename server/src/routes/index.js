const router = require('express').Router();
const basename = require('path').basename(__filename);
const { forEachJSFileInFolder } = require('../functions/fs.fn');
const privateRouter = require('./private');

forEachJSFileInFolder(__dirname, basename, (file) => {
  const filename = file.slice(0, -3);
  router.use(`/${filename}`, require(`./${filename}`));
});

router.use('/private', privateRouter);

module.exports = router;
