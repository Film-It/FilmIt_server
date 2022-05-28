module.exports = (sequelize, Sequelize) => {
const user = sequelize.define("user", {
	name: {
		type: Sequelize.STRING(30)
	},
	email: {
		type: Sequelize.STRING(30),
		primaryKey: true
	},
	userId: {
		type: Sequelize.STRING(30)
	},
	passwd: {
		type: Sequelize.STRING(30)
	},
	nickname: {
		type: Sequelize.STRING(30)
	},
	job: {
		type: Sequelize.STRING(30)
	},
	birth: {
		type: Sequelize.DATEONLY
	},
	gender: {
		type: Sequelize.STRING(10)
	},
	profileIcon: {
		type: Sequelize.STRING
	},
	introduce: {
		type: Sequelize.STRING
	}
	sido: {
		type: type: Sequelize.STRING(20)
	},
	sigungu: {
		type: Sequelize.STRING(20)
	},
	isprivate: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	}
},
	{
		timestamps: true
	});
	return user;
}

