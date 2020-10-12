'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class solve extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  solve.init({
    solve_id: DataTypes.BIGINT,
    problem_id: DataTypes.BIGINT,
    member_id: DataTypes.BIGINT,

    content: DataTypes.TEXT,
    date: DataTypes.DATE(6),
    duration: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'solve',
  });
  return solve;
};
