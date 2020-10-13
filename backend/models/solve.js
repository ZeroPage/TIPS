/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('solve', {
    solve_id: {
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
      unique: "solve_ibfk_1"
    },
    member_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'member',
        key: 'member_id'
      },
      unique: "solve_ibfk_2"
    },
    content: {
      type: "LONGTEXT",
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('current_timestamp')
    },
    duration: {
      type: DataTypes.TIME,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'solve',
    schema: 'tips',
    timestamps: false,
    });
};
