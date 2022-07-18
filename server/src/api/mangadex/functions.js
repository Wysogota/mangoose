module.exports.configureOrder = (options) => {
  const [orderType, orderDirection] = options.order.split('.');
  options[`order[${orderType}]`] = orderDirection;
  delete options.order;
  return options;
};