const fs = require('fs');

/**
 * Callback for performing operations on the file
 * @callback callback
 * @param {string} filename
 */
/**
 * Executes provided function once for each js file in folder
 * @param {string} dirname 
 * @param {string} basename 
 * @param {callback} callback 
 */
module.exports.forEachJSFileInFolder = (dirname, basename, callback) => fs
  .readdirSync(dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach(callback);