/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('problem_category', {
    category_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    parent_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'problem_category',
        key: 'category_id'
      },
      unique: "problem_category_ibfk_1"
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'problem_category',
    schema: 'tips'
    timestamps: false,
    });
};
