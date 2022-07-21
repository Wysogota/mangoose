'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    static associate({ User }) {
      RefreshToken.belongsTo(User, {
        foreignKey: 'userId',
      });
    }

    static async isTokenExists(token, userId) {
      return RefreshToken
        .findOne({ where: { value: token } })
        .then((token) => token.userId === userId)
        .catch(() => false);
    }
  }
  RefreshToken.init({
    userId: {
      field: 'user_id',
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    value: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    ua: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'RefreshToken',
    tableName: 'refresh_tokens',
    underscored: true,
  });
  return RefreshToken;
};