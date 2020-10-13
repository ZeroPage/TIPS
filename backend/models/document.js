'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  document.init({
    document_id: DataTypes.BIGINT,
    board_id: DataTypes.BIGINT,
    category_id: DataTypes.BIGINT,
    member_id: DataTypes.BIGINT,

    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    reference: DataTypes.STRING(4096),
    created: DataTypes.DATE(6),

    good_vote: DataTypes.BIGINT,
    bad_vote: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'document',
    timestamps: false,
  });
  return document;
};
