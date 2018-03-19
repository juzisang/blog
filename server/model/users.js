module.exports = function (sequelize, DataTypes) {
  return sequelize.define('users', {
      uid: {
        field: 'uid',
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        field: 'name',
        allowNull: false,
        type: DataTypes.STRING
      },
      password: {
        field: 'password',
        allowNull: false,
        type: DataTypes.STRING
      },
      mail: {
        field: 'mail',
        allowNull: false,
        type: DataTypes.STRING
      },
      url: {
        field: 'url',
        type: DataTypes.STRING
      },
      screenName: {
        field: 'screen_name',
        type: DataTypes.STRING
      },
      group: {
        field: 'group',
        type: DataTypes.ENUM,
        defaultValue: 'user',
        values: ['admin', 'user'],
      }
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci',
      timestamps: true,
      createdAt: 'ctime',
      updatedAt: 'utime',
      deletedAt: 'dtime',
    })
}