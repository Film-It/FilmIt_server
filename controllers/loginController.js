
const passport = require('passport'), LocalStrategy = require('passport-local').Strategy;

exports.showLogin = (req, res) => {
        res.render("login");
};

exports.postedLogin = (req, res) => {
	let email = req.body.email;
	let passwd = req.body.passwd;
	res.send("POST Successful!");
};