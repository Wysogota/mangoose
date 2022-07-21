const fs = require('fs');
const basename = require('path').basename(__filename);
const router = require('express').Router();
const privateRouter = require('./private');

fs.readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const filename = file.slice(0, -3);
    router.use(`/${filename}`, require(`./${filename}`));
  });

router.use('/private', privateRouter);

module.exports = router;
