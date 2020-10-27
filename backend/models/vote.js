/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vote', {
    vote_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    member_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'member',
        key: 'member_id'
      },
      unique: "vote_ibfk_1"
    },
    problem_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'problem',
        key: 'problem_id'
      },
      unique: "vote_ibfk_2"
    },
    document_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'document',
        key: 'document_id'
      },
      unique: "vote_ibfk_3"
    },
    comment_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'comment',
        key: 'comment_id'
      },
      unique: "vote_ibfk_4"
    },
    type: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('current_timestamp')
    }
  }, {
    sequelize,
    tableName: 'vote',
    schema: 'tips',
    timestamps: false
    });
};
