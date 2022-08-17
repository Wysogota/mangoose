const createHttpError = require('http-errors');
const { isEmpty } = require('lodash');
const { Role } = require('../models');

module.exports = (permissionName) => async (req, res, next) => {
  const { user } = req;
  const role = await Role.findOne({ where: { id: user.roleId } });
  const permission = await role.getPermissions({ where: { name: permissionName } });
  if (!isEmpty(permission)) next();
  else next(createHttpError(401, 'No permissions.'));
};