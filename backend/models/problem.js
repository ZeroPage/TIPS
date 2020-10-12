'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class problem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  problem.init({
    problem_id: DataTypes.BIGINT,
    category_id: DataTypes.BIGINT,
    member_id: DataTypes.BIGINT,

    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    time_limit: DataTypes.INTEGER,
    reference: DataTypes.TEXT,
    created: DataTypes.DATE(6),

    good_vote: DataTypes.BIGINT,
    bad_vote: DataTypes.BIGINT,
    hard_vote: DataTypes.BIGINT,
    easy_vote: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'problem',
  });
  return problem;
};
