/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('answer', {
    answer_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    problem_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'problem',
        key: 'problem_id'
      },
      unique: "answer_ibfk_1"
    },
    member_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'member',
        key: 'member_id'
      },
      unique: "answer_ibfk_2"
    },
    content: {
      type: "LONGTEXT",
      allowNull: false
    },
    reference: {
      type: DataTypes.STRING(4096),
      allowNull: true
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('current_timestamp')
    },
    vote: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'answer',
    schema: 'tips',
    timestamps: false
    });
};
