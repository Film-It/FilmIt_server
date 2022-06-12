const model = require('../models');
const bcrypt = require('bcrypt');

exports.showSignup = (req, res) => {
    res.render("signup");
};

exports.postedSignup = async (req, res) => {
    let hash = await bcrypt.hash(req.body.passwd, 12);

    //아이디 중복 확인
    await model.User.findOne({ where: {email:req.body.email}})
    .then(async function(data)
    {
        if((data == null || data == undefined) === false){
            res.json({result:false, message:'이미 가입된 이메일입니다.'})
        }
        //데이터 삽입
        await model.User.create({
	        userIdentifier : req.body.userIdentifier,
        	email : req.body.email,
	        passwd : hash,
        	name : req.body.name,
        	nickname : req.body.nickname,
        	birth : req.body.birth,
        	gender : req.body.gender
        })
        .then(function(createdUserCore){
            // res.json({result:true, message:'가입 완료되었습니다.'})
            res.redirect('/login');
        });
    });
};
