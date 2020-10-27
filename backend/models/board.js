/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('board', {
    board_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'board',
    schema: 'tips',
    timestamps: false
    });
};
