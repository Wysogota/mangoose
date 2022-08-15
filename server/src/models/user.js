'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
const { ROLES: { USER } } = require('../constants');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ RefreshToken, Avatar, Role }) {
      User.hasMany(RefreshToken, {
        foreignKey: 'userId',
      });
      User.hasOne(Avatar, {
        foreignKey: 'userId',
      });
      User.belongsTo(Role, {
        foreignKey: 'roleId',
      });
    }

    async comparePassword(password) {
      return await bcrypt.compare(password, this.getDataValue('password'));
    }

    async hashPassword(user) {
      if (user.changed('password')) {
        const saltRounds = parseInt(process.env.SALT_ROUNDS);
        return await bcrypt.hash(user.password, saltRounds);
      }
      return user.password;
    };

    async getDefaultRole() {
      const role = await sequelize.models.Role.findOne({ where: { name: USER } });
      return role.id;
    };

  }
  User.init({
    roleId: {
      field: 'role_id',
      type: DataTypes.INTEGER,
    },
    username: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(128),
      validate: {
        notNull: true,
        notEmpty: true,
        is: /^[a-z0-9_-]{3,15}$/i,
      }
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        notEmpty: true,
        isEmail: true,
      }
    },
    password: {
      field: 'password_hash',
      allowNull: false,
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    underscored: true,
  });

  User.beforeCreate(async (user, options) => {
    user.password = await user.hashPassword(user);
    user.roleId = await user.getDefaultRole();

  });
  User.beforeUpdate(async (user, options) => {
    user.password = await user.hashPassword(user);
  });

  return User;
};