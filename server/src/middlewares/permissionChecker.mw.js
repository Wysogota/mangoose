const createHttpError = require('http-errors');
const { isEmpty } = require('lodash');
const { Role } = require('../models');

module.exports = (permissionName) => async (req, res, next) => {
  const { user } = req;
  const permissions = await Role.getUserPermissions(user.roleId);
  if (permissions.includes(permissionName)) next();
  else next(createHttpError(401, 'No permissions.'));
};