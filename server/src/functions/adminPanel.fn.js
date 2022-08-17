module.exports.checkAccess = (user, permissionNames) =>
  user.permissions.some((permission) => permissionNames.includes(permission));