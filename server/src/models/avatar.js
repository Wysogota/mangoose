'use strict';
const crypto = require('crypto');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Avatar extends Model {
    static associate({ User }) {
      Avatar.belongsTo(User, {
        foreignKey: 'userId',
      });
    }
  }
  Avatar.init({
    userId: {
      field: 'user_id',
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      set(value) {
        const hashedName = crypto.createHash('md5').update(value).digest('hex').substring(0, 16);
        this.setDataValue('name', hashedName);
      },
    },
    mimetype: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    buffer: {
      allowNull: false,
      type: DataTypes.BLOB,
    },
  }, {
    sequelize,
    modelName: 'Avatar',
    tableName: 'avatars',
    underscored: true,
  });
  return Avatar;
};