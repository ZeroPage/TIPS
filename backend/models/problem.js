/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('problem', {
    problem_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    category_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'problem_category',
        key: 'category_id'
      },
      unique: "problem_ibfk_1"
    },
    member_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'member',
        key: 'member_id'
      },
      unique: "problem_ibfk_2"
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    content: {
      type: "LONGTEXT",
      allowNull: false
    },
    time_limit: {
      type: DataTypes.INTEGER(6),
      allowNull: false,
      defaultValue: 0
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
    good_vote: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    },
    bad_vote: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    },
    hard_vote: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    },
    easy_vote: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'problem',
    schema: 'tips',
    timestamps: false,
    });
};
