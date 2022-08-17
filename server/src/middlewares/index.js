const { forEachJSFileInFolder } = require('../functions/fs.fn');
const basename = require('path').basename(__filename);

let middlewares = {};

forEachJSFileInFolder(__dirname, basename, (file) => {
  const filename = file.slice(0, -3);
  const name = filename.split('.')[0];
  middlewares[name] = require(`./${filename}`);
});

module.exports = middlewares;