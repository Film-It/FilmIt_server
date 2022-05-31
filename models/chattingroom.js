const Sequelize = require('sequelize');

module.exports = class Chattingroom extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      content: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: true,
      modelName: 'Chattingroom',
      tableName: 'chattingrooms',
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    // db.Chattingroom.hasMany(db.Chattingmsg);
    // db.Chattingroom.belongsTo(db.User);
  }
};