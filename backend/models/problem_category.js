'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class problem_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  problem_category.init({
    category_id: DataTypes.BIGINT,
    parent_id: DataTypes.BIGINT,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'problem_category',
    timestamps: false,
  });
  return problem_category;
};
