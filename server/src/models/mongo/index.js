const { forEachJSFileInFolder } = require('../../functions/fs.fn');
const basename = require('path').basename(__filename);

let models = {};

forEachJSFileInFolder(__dirname, basename, (file) => {
  const filename = file.slice(0, -3);
  models[filename] = require(`./${filename}`);
});

module.exports = models;