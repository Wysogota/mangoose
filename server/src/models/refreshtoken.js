'use strict';
const { Model, Op } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    static associate({ User }) {
      RefreshToken.belongsTo(User, {
        foreignKey: 'userId',
      });
    }

    static async isTokenExists(token) {
      return RefreshToken
        .findOne({ where: { value: token } })
        .then(() => true)
        .catch(() => false);
    }

    static async destroyExpiredTokens() {
      const destroyedCount = await RefreshToken.destroy({
        where: {
          expiresIn: { [Op.lte]: new Date() }
        }
      });
      console.log(`<----- Destroyed ${destroyedCount} refresh tokens`);
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
    },
    expiresIn: {
      field: 'expires_in',
      allowNull: false,
      type: DataTypes.DATE,
      set(expire) {
        this.setDataValue('expiresIn', new Date(expire * 1000));
      }
    },
  }, {
    sequelize,
    modelName: 'RefreshToken',
    tableName: 'refresh_tokens',
    underscored: true,
  });
  return RefreshToken;
};