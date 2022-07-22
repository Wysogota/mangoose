const fs = require('fs');

module.exports.forEachJSFileInFolder = (dirname, basename, callback) => fs
  .readdirSync(dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach(callback);