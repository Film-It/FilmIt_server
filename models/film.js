const Sequelize = require('sequelize');

module.exports = class Film extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
        userId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'users',
                key: 'id',
            }
        },
        title: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        introduction: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        
      content: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      isprivate: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
      },
    }, {
      sequelize,
      timestamps: true,
      modelName: 'Film',
      tableName: 'films',
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
	// db.Film.hasMany(db.Post);
  }
};