const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
	name: {
		type: Sequelize.STRING(30),
	},
	email: {
		type: Sequelize.STRING(30),
		unique: true,
        allowNull: false,
	},
	userIdentifier: {
		type: Sequelize.STRING(30),
		unique: true,
	},
	passwd: {
		type: Sequelize.STRING(1024),
	},
	nickname: {
		type: Sequelize.STRING(30),
	},
	birth: {
		type: Sequelize.DATEONLY,
	},
	gender: {
		type: Sequelize.ENUM('female', 'male', 'non'),
	},
	profileIcon: {
		type: Sequelize.STRING,
		defaultValue: "../public/images/defaultProfileIcon.png"
	},
	introduction: {
		type: Sequelize.STRING,
	},
	isprivate: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
	mysalt: {
		type: Sequelize.STRING
	}
},
	{
		sequelize,
		timestamps: true,
		modelName: 'User',
		tableName: 'users',
		charset: 'utf8',
		collate: 'utf8_general_ci',
	});
}

static associate(db) {
	db.User.hasMany(db.Film, {
		foreignKey: 'id',
		allowNull: false,
		// constraints: true,
		// onDelete: 'cascade'
	});
	db.User.hasMany(db.Comment, {
		foreignKey: 'id',
		allowNull: false,
		// constraints: true,
		// onDelete: 'cascade'
	});
	db.User.hasMany(db.Chattingroom, {
		foreignKey: 'id',
		allowNull: false,
		// constraints: true,
		// onDelete: 'cascade'
	});
    // db.User.belongsToMany(db.User, {
	// 	foreignKey: 'followingId',
	// 	as: 'Followers',
	// 	through: 'follows',
	// 	foreignKeyConstraint:true,
	// 	onDelete: 'cascade'
	//   });
	//   db.User.belongsToMany(db.User, {
	// 	foreignKey: 'followerId',
	// 	as: 'Followings',
	// 	through: 'follows',
	// 	foreignKeyConstraint:true,
	// 	onDelete: 'cascade'
	//   });
    db.User.belongsToMany(db.Post, {
      foreignKey: 'id',
      through: 'Like',
	  as: 'Liked' 
    });
    db.User.belongsToMany(db.Post, {
		through: 'bookmark',
      foreignKey: 'id',
	  as: 'Bookmarked',
	  allowNull: false,
	//   constraints: true,
	//   onDelete: 'cascade'
    });
}
};
