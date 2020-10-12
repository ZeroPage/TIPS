'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  comment.init({
    comment_id: DataTypes.BIGINT,
    parent_id: DataTypes.BIGINT,
    member_id: DataTypes.BIGINT,

    problem_id: DataTypes.BIGINT,
    answer_id: DataTypes.BIGINT,
    document_id: DataTypes.BIGINT,

    content: DataTypes.TEXT,
    created: DataTypes.DATE(6),

    good_vote: DataTypes.BIGINT,
    bad_vote: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};
