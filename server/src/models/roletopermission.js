'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoleToPermission extends Model {
    static associate(models) { }
  }
  RoleToPermission.init({
    roleId: {
      field: 'role_id',
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    permissionId: {
      field: 'permission_id',
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'RoleToPermission',
    tableName: 'role_to_permissions',
    underscored: true,
  });
  return RoleToPermission;
};