const fs = require('fs');
const basename = require('path').basename(__filename);
const privateRouter = require('express').Router();
const privateAccess = require('../../middlewares/tokenChecker.mw');

privateRouter.use(privateAccess);

fs.readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const filename = file.slice(0, -3);
    privateRouter.use(`/${filename}`, require(`./${filename}`));
  });

module.exports = privateRouter;