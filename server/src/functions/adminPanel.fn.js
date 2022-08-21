/**
 * Returns true if user has necessary permissions 
 * @param {User} user 
 * @param {Array<string>} permissionNames 
 * @returns {boolean}
 */
module.exports.checkAccess = (user, permissionNames) =>
  user.permissions.some((permission) => permissionNames.includes(permission));