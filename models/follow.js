const { Sequelize } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
  class Follow extends Sequelize.Model {
    static async findByPkAndUpdate(email,params){
      try{
        let follow = await Follow.findByPk(email);
        if(follow) {
          follow = await Follow.update()(params, {
            where:{email: email}
          });
        }
        return follow;
      }
      catch(err) {
        console.log(err);
      }
    }

    static async findByPkAndRemove(email) {
      try{
        let follow = await Follow.findByPk(email);
        if(follow) {
          follow = await Follow.destroy({
            where : {email : email}
          });
        }
        return follow;
      }
      catch(err){
      console.log(err);
    }
}
getInfo() {
  return `Name : ${this.name} Email: $ {this.email}`;
}
}

Follow.init({
  email: {
		type: Sequelize.STRING(30),
		unique: true,
    allowNull: false,
	},
	userIdentifier: {
		type: Sequelize.STRING(30),
		unique: true
	},
	nickname: {
		type: Sequelize.STRING(30)
	},
  profileIcon: {
		type: Sequelize.STRING
	}
  }, {
    sequelize,
    modelName: 'follow'
  });
  return Follow;
};


  //const { Model, DataTypes } = require("sequelize");
  // static init(sequelize) {
  //   super.init(
  //     {
  //       user_from: DataTypes.INTEGER,
  //       user_to: DataTypes.INTEGER
  //     },
  //     {
  //       sequelize,
  //       tableName: "follows"
  //     }
  //   );
  // }

  // static associate(models) {
  //   this.belongsTo(models.User, {
  //     foreignKey: "user_from",
  //     through: "follows",
  //     as: "fromFollows"
  //   });
  //   this.belongsTo(models.User, {
  //     foreignKey: "user_to",
  //     through: "follows",
  //     as: "getUserFollows"
  //   });
  // }


//module.exports = Follow;