const {
  AUTHORS,
  SORT_LIST: { RELEVANCE: { type: RELEVANCE_TYPE } },
  SORT_DIRECTION: { DESC }
} = require("../../constants");

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

module.exports.deleteBlankParams = (options) => Object.fromEntries(
  Object.entries(options).filter(([, value]) => value)
);

module.exports.getAuthorProps = (options) => Object.keys(options).filter(
  (key) => AUTHORS.includes(key)
);
