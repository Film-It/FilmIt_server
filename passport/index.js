const passport = require('passport');
const local = require('./local');
const { User } = require('../models');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.email); //세션에 email만 저장
    });

    // email로 유저 찾기
    passport.deserializeUser(async (email, done) => {
        try{
            const user = await User.findOne({ where : { email }});
            done(null, user);

        }catch(error){
            console.error(error);
            done(error);
        }
    });

    local();
};