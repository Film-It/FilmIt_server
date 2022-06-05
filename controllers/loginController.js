const passport = require('passport');
const db = require("../models/index"),
User = db.User;

exports.showLogin = (req, res) => {
    res.render("login");
}

exports.postedLogin = (req, res) => {
	let email = req.body.email;
	let passwd = req.body.passwd;

    let result = User.findOne({
        where:{email, passwd}
    })

    req.session.uid = req.body.id;
    req.session.isLogin = true;

    req.session.save(()=>{
        res.redirect('/');
    })
};

// module.exports = {
//     login: (req, res) => {
//         res.render("login");
//     },
//     logout: (req, res, next) => {
//         req.logout((err) => {
//             res.locals.redirect = "/login";
//             next();
//         });
//     },

//     // authenticate: passport.authenticate("local", {
//     //     failureRedirect: "login",
//     //     successRedirect: "/"
//     // })
// };