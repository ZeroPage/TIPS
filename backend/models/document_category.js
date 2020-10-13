'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class document_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  document_category.init({
    category_id: DataTypes.BIGINT,
    parent_id: DataTypes.BIGINT,
    board_id: DataTypes.BIGINT,

    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'document_category',
    timestamps: false,
  });
  return document_category;
};
