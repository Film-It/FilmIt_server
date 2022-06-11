const Sequelize = require('sequelize');

module.exports = class Chattingmsg extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      content: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: true,
      modelName: 'Chattingmsg',
      tableName: 'chattingmsgs',
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.Chattingmsg.belongsTo(db.User);
    db.Chattingmsg.belongsTo(db.Chattingroom);
  }
};