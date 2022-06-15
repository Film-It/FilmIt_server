const passport = require('passport');
const db = require("../models/index"),
User = db.User;

exports.showLogin = (req, res) => {
    res.render("login");
}