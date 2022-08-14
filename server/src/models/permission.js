'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    static associate({ Role, RoleToPermission }) {
      Permission.belongsToMany(Role, {
        through: RoleToPermission,
        foreignKey: 'permissionId',
      });
    }
  }
  Permission.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Permission',
    tableName: 'permissions',
    underscored: true,
  });
  return Permission;
};