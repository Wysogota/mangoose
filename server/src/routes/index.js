const router = require('express').Router();
const { forEachJSFileInFolder } = require('../functions');
const privateRouter = require('./private');

forEachJSFileInFolder(__dirname, (file) => {
  const filename = file.slice(0, -3);
  router.use(`/${filename}`, require(`./${filename}`));
});

router.use('/private', privateRouter);

module.exports = router;
