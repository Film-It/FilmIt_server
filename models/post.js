const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
        title: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
      content: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      img: {
        type: Sequelize.STRING(200),
        allowNull: true,
        defaultValue: null
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
    db.Post.belongsTo(db.Film);
    db.Post.hasMany(db.Comment, {
      foreignKey: 'id',
      allowNull: false,
      // constraints: true,
      // onDelete: 'cascade'
    });
    db.Post.belongsToMany(db.User, {
      through: 'bookmark',
      foreignKey: 'id',
	    allowNull: false,
	    // constraints: true,
	    // onDelete: 'cascade'
    });
    db.Post.belongsToMany(db.User, {
      foreignKey: 'id',
      through: 'Like'
    });
  }
};