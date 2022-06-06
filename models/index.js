const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

const User = require("./user");
const Film = require("./film");
const Post = require("./post");
const Comment = require("./comment");
const Chattingmsg = require("./chattingmsg");
const Chattingroom = require("./chattingroom");
const Bookmark = require("./bookmark");
const Like = require("./like");

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.User = User;
db.Film = Film;
db.Post = Post;
db.Comment = Comment;
db.Chattingmsg = Chattingmsg;
db.Chattingroom = Chattingroom;
db.Bookmark = Bookmark;
db.Like = Like;

User.init(sequelize);
Film.init(sequelize);
Post.init(sequelize);
Comment.init(sequelize);
Chattingmsg.init(sequelize);
Chattingroom.init(sequelize);
Bookmark.init(sequelize);
Like.init(sequelize);

User.associate(db);
Film.associate(db);
Post.associate(db);
Comment.associate(db);
Chattingmsg.associate(db);
Chattingroom.associate(db);
Bookmark.associate(db);
Like.associate(db);

// User.passportLocalSequelize.attachToUser(User, {
//     usernameField: 'email',
//     hashField: 'passwd',
//     saltFiedl: 'mysalt'
// });

module.exports = db;