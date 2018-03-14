module.exports = function (sequelize, DataTypes) {
  return sequelize.define('metas', {
      mid: {
        field: 'mid',
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        field: 'name',
        type: DataTypes.STRING,
        allowNull: false
      },
      slug: {
        field: 'slug',
        allowNull: false,
        type: DataTypes.STRING
      },
      description: {
        field: 'description',
        allowNull: true,
        type: DataTypes.STRING
      },
      type:   {
        allowNull: true,
        type: DataTypes.ENUM,
        values: ['tag', 'category'],
      }
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci',
      timestamps: false
    })
}