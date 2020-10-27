/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('document_category', {
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
        model: 'document_category',
        key: 'category_id'
      },
      unique: "document_category_ibfk_1"
    },
    board_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'board',
        key: 'board_id'
      },
      unique: "document_category_ibfk_2"
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'document_category',
    schema: 'tips',
    timestamps: false
    });
};
