const router = require('express').Router();
const basename = require('path').basename(__filename);
const { forEachJSFileInFolder } = require('../functions/fs.fn');

forEachJSFileInFolder(__dirname, basename, (file) => {
  const filename = file.slice(0, -3);
  router.use(`/${filename}`, require(`./${filename}`));
});

module.exports = router;
