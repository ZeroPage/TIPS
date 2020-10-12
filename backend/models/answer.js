'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  answer.init({
    answer_id: DataTypes.BIGINT,
    member_id: DataTypes.BIGINT,
    problem_id: DataTypes.BIGINT,

    content: DataTypes.TEXT,
    reference: DataTypes.STRING(4096),
    created: DataTypes.DATE(6),

    good_vote: DataTypes.BIGINT,
    bad_vote: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'answer',
  });
  return answer;
};
