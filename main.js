const express = require("express"),
	app = express(),
	homeController = require("./controllers/homeController"),
	loginController = require("./controllers/loginController"),
	userController = require("./controllers/userController"),
	signupController = require("./controllers/signupController"),
	layouts = require("express-ejs-layouts"),
	session = require('express-session'),
	cookieParser = require('cookie-parser'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	db = require("./models/index");

app.set("port", process.env.PORT || 80);
app.set("view engine", "ejs");
app.engine("html", require('ejs').renderFile);
app.use('/public', express.static(__dirname + '/public'));

app.use(
	express.urlencoded({
		extended: false
	})
);
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

db.sequelize.sync({ force: true })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

app.get("/name", homeController.respondWithName);
app.get("/login", loginController.showLogin);
app.post("/login", loginController.postedLogin);
app.get("/users", userController.getAllUsers);
app.get("/signup", signupController.showSignup);
app.post("/signup", signupController.postedSignup);

// //로그 아웃 처리
// app.get('/logout',(req,res)=>{
//     //passport 정보 삭제
//     req.logout();
//     //서버측 세션 삭제
//     req.session.destroy(()=>{
//         //클라이언트 측 세션 암호화 쿠키 삭제
//         res.cookie('connect.sid','',{maxAge:0});
//         res.redirect('/');
//     });
// });

app.listen(app.get("port"), () => {
	console.log(`Server running at http://localhost: ${app.get("port")}`);
});
