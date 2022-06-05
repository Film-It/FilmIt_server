const express = require("express"),
	app = express(),
	bodyParser = require('body-parser'),
	homeController = require("./controllers/homeController"),
	loginController = require("./controllers/loginController"),
	userController = require("./controllers/userController"),
	signupController = require("./controllers/signupController"),
	cookieParser = require('cookie-parser'),
	layouts = require("express-ejs-layouts"),
	db = require("./models/index");

app.set("port", process.env.PORT || 80);
app.set("view engine", "ejs");
app.engine("ejs", require('ejs').renderFile);
app.use('/public', express.static(__dirname + '/public'));

const passport = require('passport');
const passportConfig = require('./passport');
passportConfig();
const session = require('express-session');

db.sequelize.sync({ force: true })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser('secret'));
app.use(session({
    secret:'secret',
    cookie: {
      maxAge: 4000000
    },
    resave:false,
    saveUninitialized:false
}));

//passport 이용
app.use(passport.initialize());
app.use(passport.session());
// passport.use(User.createStrategy());
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   User.findById(id, function(err, user) {
//     done(err, user);
//   });
// });

// router.use((req, res, next) => {
//   res.locals.loggedIn = req.isAuthenticated();
//   res.locals.currentUser = req.user;
//   next();
// });


  // passport.serializeUser(function(user, done) {
	// console.log("serializeUser ", user)
	// done(null, user.ID);
  // });
  
  // passport.deserializeUser(function(id, done) {
	//   console.log("deserializeUser id ", id)
	//   let userinfo;
	//   let sql = 'SELECT * FROM USER WHERE ID=?';
	//   mysql.query(sql , [id], function (err, result) {
	// 	if(err) console.log('mysql 에러');     
	   
	// 	console.log("deserializeUser mysql result : " , result);
	// 	let json = JSON.stringify(result[0]);
	// 	userinfo = JSON.parse(json);
	// 	done(null, userinfo);
	//   })    
  // });
  
// router.get("/login", loginController.login);
app.get("/login", loginController.showLogin);

app.post('/login', (req,res, next)=> {
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

          return res.redirect('/');
      })
  })(req, res, next);
});

// router.post("/login",
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/login"
//   })
// );
// app.get('/login', function(req, res, next) {
// 	let userId = "";
// 	if(req.cookies['loginId'] !== undefined){
// 	  console.log(req.cookies['loginId']);
// 	  userId = req.cookies['rememberId'];
// 	}
// 	res.render('login', {userId: userId});
//   });
// router.post("/login", loginController.authenticate);

app.get("/users", userController.getAllUsers);
app.get("/signup", signupController.showSignup);
app.post("/signup", signupController.postedSignup);

// passport.use(new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'passwd'
//   },
//   function(username, password, done) {
//     let sql = 'SELECT * FROM USER WHERE ID=? AND PWD=?';
//     mysql.query(sql , [username, password], function (err, result) {
//       if(err) console.log('mysql 에러');  

//       // 입력받은 ID와 비밀번호에 일치하는 회원정보가 없는 경우   
//       if(result.length === 0){
//         console.log("결과 없음");
//         return done(null, false, { message: 'Incorrect' });
//       }else{
//         console.log(result);
//         let json = JSON.stringify(result[0]);
//         let userinfo = JSON.parse(json);
//         console.log("userinfo " + userinfo);
//         return done(null, userinfo);  // result값으로 받아진 회원정보를 return해줌
//       }
//     })
//   }
// ));

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


app.get("/", homeController.showHome);

app.listen(app.get("port"), () => {
	console.log(`Server running at http://localhost: ${app.get("port")}`);
});
