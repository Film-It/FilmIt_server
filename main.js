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
app.use(passport.session);

db.sequelize.sync({ force: true })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

  //로그인 인증 (Passport)
passport.use(new LocalStrategy({
	//로그인 페이지 input 태그 내 name
	usernameField: 'email',
	passwordField: 'passwd'
},
(id, password, done)=>{
  console.log(id, password);
//회원 정보가 한개이상 있을때
if(user){
  console.log(user);

	//아이디가 다를때
	if (id !== user.email)  
		return done(null, false, { message: '아이디가 다르다' });
	//비밀번호가 다를때
	else if (password !== user.password) 
		return done(null, false, { message: '비번이 다르다' });
	//아이디, 비밀번호 모두 맞을 경우
	return done(null, user);
}
}));

passport.serializeUser(function(user, done) {   //쓰기
    done(null, user.email);
});

passport.deserializeUser(function(id, done) {   //읽기
    done(null, id);
});

app.get("/name", homeController.respondWithName);
app.get("/login", loginController.showLogin);
// app.post("/login", loginController.postedLogin);
app.post("/login", (req,res, next)=> {
    passport.authenticate('local', (err, user, info) => {
        if(err){
            console.error(err);
            return next(err);
        }
        if(info){
            return res.status(401).send(info.reason);
        }
        
        // passport.login
        return req.login(user, async(loginErr) => {
            if(loginErr){
                console.error(loginErr);
                return next(loginErr);
            }

            return res.json(user);
        })
    })(req, res, next);
});
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
