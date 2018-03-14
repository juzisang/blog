module.exports = function (sequelize, DataTypes) {
  return sequelize.define('options', {
      name: {
        field: 'name',
        allowNull: false,
        type: DataTypes.STRING
      },
      value: {
        field: 'value',
        allowNull: false,
        type: DataTypes.STRING
      },
      user: {
        field: 'user',
        allowNull: false,
        type: DataTypes.INTEGER
      }
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci',
      timestamps: false
    })
}