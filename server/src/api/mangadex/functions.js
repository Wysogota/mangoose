const {
  AUTHORS,
  SORT_LIST: { RELEVANCE: { type: RELEVANCE_TYPE } },
  SORT_DIRECTION: { DESC }
} = require('../../constants');

/**
 * Returns options with configured order param
 * @param {Object} options 
 * @returns {Object} options 
 */
module.exports.configureOrder = (options) => {
  if (!options.order) {
    options[`order[${RELEVANCE_TYPE}]`] = DESC;
    return options;
  }

  const [orderType, orderDirection] = options.order.split('.');
  options[`order[${orderType}]`] = orderDirection || DESC;
  delete options.order;
  return options;
};

/**
 * Returns options with removed blank params
 * @param {Object} options 
 * @returns {Object} options 
 */
module.exports.deleteBlankParams = (options) => Object.fromEntries(
  Object.entries(options).filter(([, value]) => value)
);

/**
 * Returns array of authors prop names if it existed
 * @param {Object} options 
 * @returns {[artist:string, author:string]} author names 
 */
module.exports.getAuthorProps = (options) => Object.keys(options).filter(
  (key) => AUTHORS.includes(key)
);
