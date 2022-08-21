'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate({ Permission, RoleToPermission, User }) {
      Role.belongsToMany(Permission, {
        through: RoleToPermission,
        foreignKey: 'roleId'
      });
      Role.hasOne(User, {
        foreignKey: 'roleId',
      });
    }

    static async getUserPermissions(roleId) {
      const role = await Role.findOne({ where: { id: roleId } });
      const permissions = await role.getPermissions({ attributes: ['name'] });
      return permissions.map(({ name }) => name);
    }
  }
  Role.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Role',
    tableName: 'roles',
    underscored: true,
  });
  return Role;
};