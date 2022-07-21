const fs = require('fs');
const basename = require('path').basename(__filename);

module.exports.forEachJSFileInFolder = (dirname, callback) => fs
  .readdirSync(dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach(callback);
