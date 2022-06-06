exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
      next(); // 로그인 상태면 다음 미들웨어 호출
    } else {
      res.status(403).send('로그인 필요');
    }
  };
  
  exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
      next();
    } else {
      const message = encodeURIComponent('이미 로그인 한 상태입니다.');
      res.redirect(`?error=${message}`);
    }
  };