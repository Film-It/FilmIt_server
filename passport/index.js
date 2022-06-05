const passport = require('passport');
const local = require('./local');
const db = require("../models/index"),
User = db.User;

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id); //세션에 id만 저장
    });

    // id로 유저 찾기
    passport.deserializeUser(async (id, done) => {
        try{
            const user = await User.findOne({ where : { id }});
            done(null, user);

        }catch(error){
            console.error(error);
            done(error);
        }
    });

    local();
};