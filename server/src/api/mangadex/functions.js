module.exports.configureOrder = (options) => {
  if (!options.order) return options;

  const [orderType, orderDirection] = options.order.split('.');
  options[`order[${orderType}]`] = orderDirection;
  delete options.order;
  return options;
};

module.exports.deleteBlankParams = (options) => Object.fromEntries(
  Object.entries(options).filter(([, value]) => value)
);