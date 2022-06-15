const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();
const { Film, User } = require('../models');

// 라우터용 미들웨어, 템플릿 엔진에서 사용할 user, followerCount 등을 res.locals 로 설정
// res.locals 로 설정하는 이유는 각 변수가 모든 템플릿 엔진에서 공통으로 사용되기 때문
router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.films = [];
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followerIdList = [];
  next();
});

  
//   // 회원가입 하기
//   router.get('/signup', isNotLoggedIn, (req, res) => {
//     res.render('signup');
//   });

// router.get('/profile/:id', (req, res, next) => {
//   Film.findAll({
//   include: {
//   model: User,
//   attributes: ['id','nickname', 'userIdentifier'],
//   },
//   order: [['createdAt','DESC']],
//   })
//   .then((films) => {
//   res.render('profile', {
//   twits: films,
//   user: req.user
//   });
//   })
//   .catch((error) => {
//   console.error(error);
//   next(error);
//   });
//   });
  

module.exports = router;