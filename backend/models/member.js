/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('member', {
    member_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: "username"
    },
    nickname: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: "nickname"
    },
    email: {
      type: DataTypes.STRING(180),
      allowNull: false,
      unique: "email"
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    is_admin: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 0
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('current_timestamp')
    }
  }, {
    sequelize,
    tableName: 'member',
    schema: 'tips',
    timestamps: false,
    });
};
