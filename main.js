const express = require("express"),
	app = express(),
	bodyParser = require('body-parser'),
	homeController = require("./controllers/homeController"),
	loginController = require("./controllers/loginController"),
	userController = require("./controllers/userController"),
	filmController = require("./controllers/filmController"),
	postController = require("./controllers/postController"),

	cookieParser = require('cookie-parser'),
	layouts = require("express-ejs-layouts"),
  multer = require("multer"),
  fs = require('fs'),
	db = require("./models/index"),
  pageRouter = require('./routes/pages');

const { isLoggedIn, isNotLoggedIn, localMiddleware} = require('./routes/middlewares');

app.set("port", process.env.PORT || 80);
app.set("view engine", "ejs");
app.engine("ejs", require('ejs').renderFile);
app.use('/public', express.static(__dirname + '/public'));

//passport, session
const passport = require('passport');
const passportConfig = require('./passport');
passportConfig();
const session = require('express-session');

//sequelize 연결
db.sequelize.sync({ alter: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

//bodyParser
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

//multer 이용
const storage  = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "public/images/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}__${file.originalname}`);
  },
});
const uploadWithOriginalFilename = multer({ storage: storage });

//로그인 화면
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


// app.get("/users", userController.getAllUsers);

//회원가입 화면
app.get("/signup", isNotLoggedIn, userController.showSignup);
app.post("/signup", userController.postedSignup);

// 로그아웃
app.get('/profile/logout', isLoggedIn, (req, res, next) => {
  req.logout((err) => {// req.user 객체 제거
    if (err) { return next(err); }
    req.session.destroy((err) => {
    res.redirect('/login');
    })
  }); 
});

//회원 탈퇴
app.get('/userDelete', (req, res) => {
  res.render('userDelete');
});
app.post('/userDelete', postController.getAllPosts, userController.deleteUser);
app.get('/goodbye', (req, res) => {
  res.render('goodbye');
});

//필름 생성 화면 get, post
app.get('/profile/film', isLoggedIn, (req, res) => {
  res.render("film");
});
app.post('/profile/film', isLoggedIn, filmController.createFilm);

//게시글 생성 화면 get, post
app.get('/profile/post', isLoggedIn, filmController.getAllFilmTitles, (req, res) => {
  res.render('post');
});
app.post('/profile/post', isLoggedIn, uploadWithOriginalFilename.single('image'), postController.createPosts);
// app.get('/profile/:id/post', (req, res) => {
//   res.render("post");
// });

//유저 정보 수정 화면 get, post
app.get('/profile/settings', isLoggedIn, localMiddleware, (req, res) => {
  res.render('settings');
});
app.post('/profile/settings', isLoggedIn, uploadWithOriginalFilename.single('profileIcon'), userController.editUser);

//프로필 화면 랜더링
app.use('/profile/:id', isLoggedIn, userController.findUser, filmController.getAllFilms, postController.getAllPosts, (req, res) => {
  res.render('profile');
});

// app.use('/', pageRouter);

app.listen(app.get("port"), () => {
	console.log(`Server running at http://localhost: ${app.get("port")}`);
});
