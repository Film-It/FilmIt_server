const express = require("express"),
	app = express(),
	bodyParser = require('body-parser'),
	homeController = require("./controllers/homeController"),
	loginController = require("./controllers/loginController"),
	userController = require("./controllers/userController"),
	signupController = require("./controllers/signupController"),
	filmController = require("./controllers/filmController"),

	cookieParser = require('cookie-parser'),
	layouts = require("express-ejs-layouts"),
	db = require("./models/index"),
  pageRouter = require('./routes/pages');

const { isLoggedIn, isNotLoggedIn} = require('./routes/middlewares');

app.set("port", process.env.PORT || 80);
app.set("view engine", "ejs");
app.engine("ejs", require('ejs').renderFile);
app.use('/public', express.static(__dirname + '/public'));

const passport = require('passport');
const passportConfig = require('./passport');
passportConfig();
const session = require('express-session');
// const nunjucks = require('nunjucks');
// nunjucks.configure('views', {
//   express: app,
//   watch: true
// });

db.sequelize.sync({ alter: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    secret:process.env.COOKIE_SECRET,
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

app.post('/login', isNotLoggedIn, (req,res, next)=> {
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

          return res.redirect(`/profile/${user.userIdentifier}`);
      })
  })(req, res, next);
});

// app.use((req, res, next) => {
//   res.locals.user = req.user;
//   res.locals.films = [];
//   res.locals.followerCount = 0;
//   res.locals.followingCount = 0;
//   res.locals.followerIdList = [];
//   next();
// });

app.get("/users", userController.getAllUsers);
app.get("/signup", isNotLoggedIn, signupController.showSignup);
app.post("/signup", signupController.postedSignup);

// 로그아웃
app.get('/profile/logout', isLoggedIn, (req, res, next) => {
  req.logout((err) => {// req.user 객체 제거
    if (err) { return next(err); }
    req.session.destroy((err) => {
    res.redirect('/login');
    })
  }); 
});

app.get('/profile/film', isLoggedIn, (req, res, next) => {
  res.render("film");
});
app.post('/profile/film', isLoggedIn, async (req, res) => {
  await db.Film.create({
      UserId : req.user.id,
      title : req.body.title
  });

  res.redirect(`/profile/${req.user.userIdentifier}`);
}
);

app.get('/profile/post', isLoggedIn, (req, res, next) => {
  res.render("post");
});
//필름 생성
app.post('/profile/post', isLoggedIn, async (req, res) => {
  await db.Post.create({
      FilmId : req.film.id,
      title : req.body.post_title,
      content : req.body.content
  });

  res.redirect(`/profile/${req.user.userIdentifier}`);
}
);


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

// app.get("/", homeController.showHome);
app.use('/profile/:id', isLoggedIn, filmController.getAllFilms, (req, res) => {
  res.render('profile');
});
// app.use('/', pageRouter);

app.listen(app.get("port"), () => {
	console.log(`Server running at http://localhost: ${app.get("port")}`);
});
