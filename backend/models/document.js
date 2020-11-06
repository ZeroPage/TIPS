/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('document', {
    document_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    board_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'board',
        key: 'board_id'
      },
      unique: "document_ibfk_1"
    },
    category_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'document_category',
        key: 'category_id'
      },
      unique: "document_ibfk_2"
    },
    member_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'member',
        key: 'member_id'
      },
      unique: "document_ibfk_3"
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
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
    }
  }, {
    sequelize,
    tableName: 'document',
    schema: 'tips',
    timestamps: false
    });
};
