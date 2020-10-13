/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comment', {
    comment_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    parent_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'comment',
        key: 'comment_id'
      },
      unique: "comment_ibfk_1"
    },
    member_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'member',
        key: 'member_id'
      },
      unique: "comment_ibfk_2"
    },
    problem_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'problem',
        key: 'problem_id'
      },
      unique: "comment_ibfk_3"
    },
    answer_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'answer',
        key: 'answer_id'
      },
      unique: "comment_ibfk_4"
    },
    document_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'document',
        key: 'document_id'
      },
      unique: "comment_ibfk_5"
    },
    content: {
      type: "LONGTEXT",
      allowNull: false
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('current_timestamp')
    },
    good_vote: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    },
    bad_vote: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'comment',
    schema: 'tips'
    });
};
