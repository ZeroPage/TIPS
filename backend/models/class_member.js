/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('class_member', {
    class_member_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    class_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'class',
        key: 'class_id'
      },
      unique: "class_member_ibfk_1"
    },
    member_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'member',
        key: 'member_id'
      },
      unique: "class_member_ibfk_2"
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('current_timestamp')
    }
  }, {
    sequelize,
    tableName: 'class_member',
    schema: 'tips',
    timestamps: false
    });
};
