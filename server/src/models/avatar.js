'use strict';
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
    mimetype: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    encoding: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    buffer: {
      allowNull: false,
      type: DataTypes.BLOB('long'),
    },
    size: {
      allowNull: false,
      type: DataTypes.NUMBER,
    },
  }, {
    sequelize,
    modelName: 'Avatar',
    tableName: 'avatars',
    underscored: true,
  });
  return Avatar;
};