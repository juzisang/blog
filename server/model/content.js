module.exports = function (sequelize, DataTypes) {
  return sequelize.define('contents', {
      cid: {
        field: 'cid',
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      title: {
        field: 'title',
        type: DataTypes.STRING,
        allowNull: false
      },
      slug: {
        field: 'slug',
        type: DataTypes.STRING,
        allowNull: true
      },
      content: {
        field: 'content',
        type: DataTypes.TEXT,
        allowNull: false
      },
      authorId: {
        field: 'author_id',
        type: DataTypes.INTEGER
      },
      status: {
        field: 'status',
        type: DataTypes.ENUM,
        values: ['online', 'draft', 'delete'],
        allowNull: false
      },
      type: {
        field: 'type',
        type: DataTypes.ENUM,
        values: ['article', 'page', 'file'],
        allowNull: false
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