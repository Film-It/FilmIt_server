const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

const User = require("./user");
const Post = require("./post");
const Comment = require("./comment");
const Chattingmsg = require("./chattingmsg");
const Chattingroom = require("./chattingroom");

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Comment = Comment;
db.Chattingmsg = Chattingmsg;

User.init(sequelize);
Post.init(sequelize);
Comment.init(sequelize);
Chattingmsg.init(sequelize);
Chattingroom.init(sequelize);

User.associate(db);
Post.associate(db);
Comment.associate(db);
Chattingmsg.associate(db);
Chattingroom.associate(db);

// User.passportLocalSequelize.attachToUser(User, {
//     usernameField: 'email',
//     hashField: 'passwd',
//     saltFiedl: 'mysalt'
// });

module.exports = db;