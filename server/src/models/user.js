'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

const hashPassword = async (user, options) => {
  if (user.changed('password')) {
    const saltRounds = parseInt(process.env.SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;
  }
};

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ RefreshToken, Avatar }) {
      User.hasMany(RefreshToken, {
        foreignKey: 'userId',
      });
      User.hasOne(Avatar, {
        foreignKey: 'userId',
      });
    }

    async comparePassword(password) {
      return await bcrypt.compare(password, this.getDataValue('password'));
    }

  }
  User.init({
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

  User.beforeCreate(hashPassword);
  User.beforeUpdate(hashPassword);

  return User;
};