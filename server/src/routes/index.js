const fs = require('fs');
const basename = require('path').basename(__filename);
const router = require('express').Router();

fs.readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const filename = file.slice(0, -3);
    router.use(`/${filename}`, require(`./${filename}`));
  });

module.exports = router;