const Sequelize = require('sequelize');

module.exports = class Like extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
    }, {
      sequelize,
      timestamps: true,
      modelName: 'Like',
      tableName: 'likes',
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    // db.Comment.belongsTo(db.User);
    // db.Comment.belongsTo(db.Post);
  }
};