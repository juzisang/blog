module.exports = function (sequelize, DataTypes) {
  return sequelize.define('comments', {
      coid: {
        field: 'coid',
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      cid: {
        field: 'cid',
        type: DataTypes.INTEGER,
        allowNull: false
      },
      author: {
        field: 'author',
        allowNull: false,
        type: DataTypes.STRING
      },
      authorId: {
        field: 'author_id',
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      ownerId: {
        field: 'owner_id',
        allowNull: false,
        type: DataTypes.INTEGER,
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
      ip: {
        field: 'ip',
        type: DataTypes.STRING,
        validate: {isIP: true}
      },
      agent: {
        field: 'agent',
        type: DataTypes.STRING
      },
      text: {
        field: 'text',
        allowNull: false,
        type: DataTypes.TEXT
      },
      status: {
        field: 'status',
        allowNull: false,
        type: DataTypes.ENUM,
        values: ['online', 'delete']
      },
      parent: {
        field: 'parent',
        type: DataTypes.INTEGER,
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