module.exports = function (sequelize, DataTypes) {
  return sequelize.define('relationships', {
      cid: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      mid: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci',
      timestamps: false,
      deletedAt: 'dtime',
    })
}