
const passport = require('passport'), LocalStrategy = require('passport-local').Strategy;

exports.showLogin = (req, res) => {
        res.render("login");
};

exports.postedLogin = (req, res) => {
	let email = req.body.email;
	let passwd = req.body.passwd;
	res.send("POST Successful!");
};

// exports.passport.authenticate('local', {
//     //성공시, 메인페이지 이동
//     //실패시 로그인 페이지 이동
//     successRedirect: '/',
//     failureRedirect: '/login'
// })