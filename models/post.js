const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
        title: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
      content: {
        type: Sequelize.STRING(140),
        allowNull: false,
      },
      img: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: true,
      modelName: 'Post',
      tableName: 'posts',
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    // db.Post.hasMany(db.Comment);
    // db.Post.belongsTo(db.Film);
  }
};