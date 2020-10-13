'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  member.init({
    member_id: DataTypes.BIGINT,
    username: DataTypes.STRING(80),
    nickname: DataTypes.STRING(40),
    email: DataTypes.STRING(180),
    password: DataTypes.STRING(60),
    is_admin: DataTypes.BOOLEAN,
    created: DataTypes.DATE(6)
  }, {
    sequelize,
    modelName: 'member',
    timestamps: false,
  });
  return member;
};
