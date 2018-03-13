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
        allowNull: false
      },
      content: {
        field: 'content',
        type: DataTypes.TEXT,
        allowNull: false
      },
      authorId: {
        field: 'author_id',
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'uid',
        }
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
      },
      createTime: {
        field: 'create_time',
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
      },
      modifiedTime: {
        field: 'modified_time',
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci',
      timestamps: false
    })
}